"""empty message

Revision ID: 0feb1aa4ffb4
Revises: f28a0012e3d1
Create Date: 2022-10-10 21:04:35.393790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0feb1aa4ffb4'
down_revision = 'f28a0012e3d1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('staff_id', sa.Integer(), nullable=True),
    sa.Column('room_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('is_edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['rooms.id'], ),
    sa.ForeignKeyConstraint(['staff_id'], ['staffs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    # ### end Alembic commands ###
