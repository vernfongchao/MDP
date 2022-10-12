"""empty message

Revision ID: f28a0012e3d1
Revises: 890e24f83fc0
Create Date: 2022-10-10 21:03:57.551736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f28a0012e3d1'
down_revision = '890e24f83fc0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('staff_id_1', sa.Integer(), nullable=True),
    sa.Column('staff_id_2', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['staff_id_1'], ['staffs.id'], ),
    sa.ForeignKeyConstraint(['staff_id_2'], ['staffs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rooms')
    # ### end Alembic commands ###
