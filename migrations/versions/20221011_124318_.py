"""empty message

Revision ID: f1e7781af5ae
Revises: 0feb1aa4ffb4
Create Date: 2022-10-11 12:43:18.481640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1e7781af5ae'
down_revision = '0feb1aa4ffb4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('messages', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('rooms', sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    op.add_column('rooms', sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('rooms', 'updated_at')
    op.drop_column('rooms', 'created_at')
    op.drop_column('messages', 'updated_at')
    op.drop_column('messages', 'created_at')
    # ### end Alembic commands ###
