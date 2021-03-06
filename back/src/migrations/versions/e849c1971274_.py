"""empty message

Revision ID: e849c1971274
Revises: 403a881b9943
Create Date: 2021-03-05 02:01:02.672334

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e849c1971274'
down_revision = '403a881b9943'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.String(length=100), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('picture_url', sa.String(length=200), nullable=True),
    sa.Column('status_message', sa.String(length=200), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###