import boto3
import botocore
import os
import uuid
import eventlet

eventlet.monkey_patch(all=True)

if True:
    import eventlet.green.ssl

    def _green_ssl_recv_into (self, buffer, nbytes=None, flags=0):
        if self._sslobj:
            if flags != 0:
                raise ValueError(
                    "non-zero flags not allowed in calls to recv_into() on %s" %
                    self.__class__)
            if nbytes is None:
                if buffer:
                    nbytes = len(buffer)
                else:
                    nbytes = 1024
            read = self.read(nbytes, buffer)
            return read
        else:
            while True:
                try:
                    return eventlet.green.ssl.socket.recv_into(self, buffer, nbytes, flags)
                except eventlet.green.ssl.orig_socket.error as e:
                    if self.act_non_blocking:
                        raise
                    erno = eventlet.green.ssl.get_errno(e)
                    if erno in eventlet.green.ssl.greenio.SOCKET_BLOCKING:
                        try:
                            eventlet.green.ssl.trampoline(
                                self, read=True,
                                timeout=self.gettimeout(), timeout_exc=eventlet.green.ssl.timeout_exc('timed out'))
                        except eventlet.green.ssl.IOClosed:
                            return b''
                    elif erno in eventlet.green.ssl.greenio.SOCKET_CLOSED:
                        return b''
                    raise

    eventlet.green.ssl.GreenSSLSocket.recv_into = _green_ssl_recv_into

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = { "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):

    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def delete_image_from_s3(filename):
    s3.delete_object(Bucket=BUCKET_NAME, Key=filename)
