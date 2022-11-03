from app.models import db, Condition

def seed_conditions():

    conditions = [
        Condition(name="",description="",type="")
    ]

    db.session.add_all(conditions)
    db.session.commit

    # physical diseases, 
    # mental diseases, 
    # infectious diseases, 
    # non- infectious diseases, 
    # deficiency diseases, 
    # inherited diseases, 
    # degenerative diseases, 
    # social diseases, 
    # self-inflicted diseases.

def undo_conditions():
    db.session.execute('TRUNCATE conditions RESTART IDENTITY CASCADE;')
    db.session.commit()
