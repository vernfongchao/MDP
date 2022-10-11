from app.models import db, Message

def seed_messages():
    messages = [
        Message(staff_id=2, room_id=1,
                content="Hey Demo, just wanted to introduce myself, I am the new heard of directors. Nice to meet you!"),
        Message(staff_id=1, room_id=1,
                content="Hey Vern, nice to meet ya, I look for to your leadership and continue to make this hospital great."),
        Message(staff_id=1, room_id=2,
                content="Hey Chiew, are you interested in working in the Optometry Clinic? Theres a new spot open."),
        Message(staff_id=3, room_id=2,
                content="Thanks for the offer but im already swamped in the current clinics, I also been out of practice in Optometry, I can give you a recommendation for another staff member if you want."),
        Message(staff_id=1, room_id=3,
                content="Hey Lucas, How about joining a 4th department? I've heard about your work and ill be honored if you can join my department, even if it's part-time."),
        Message(staff_id=4, room_id=3,
                content="Hey Demo, Thanks for the invitation and I would love to join your department. The work over here has been slow, so I'd be able to juggle between departments."),
    ]
    db.session.add_all(messages)
    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
