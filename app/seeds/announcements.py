from app.models import db, Announcement


def seed_announcements():
    announcement1 = Announcement(title="New Mask Mandate",content="<h1>NEW MASK MANDATE EFFECTIVE IMMEDIATELY</h1><p><br></p><p>All staff and patients are now required to be worn while inside the premises of the Hospital at all times. Failure to do so will be removed from the premises.</p><p><br></p><p>The front desk will provide masks for any individual seen entering without one.</p>",staff_id=5)
    announcement2 = Announcement(title="Change in Hazardous Materials Disposal ",content="<h2>Hazardous Materials must be bagged into the new Pylon Plastic bags and to be disposed Ward B garbage location.</h2>",staff_id=1)
    announcement3 = Announcement(title="Welcome Dr. Vern Chao",content="<h1>Please give a warm applause for Dr. Vern Chao!</h1><p><br></p><p>He previously worked as the Red Cross Hospital in Syria for over 20 years providing care for the unfortunates. We are happy to welcome Dr. Vern Chao as our new head director!</p>",staff_id=3)
    announcement4 = Announcement(title="Happy Birthday Katerina Kreibich",content="<h1>We would like to wish Katerina a happy birthday!</h1><p><br></p><p>She has been with us for over 5 years providing therapy for low income families. We are grateful to have her in the therapy department for all that she has done!</p>",staff_id=4)
    announcement5 = Announcement(title="Flu Vaccinations 9/22/2022",content="<h2>Flu Vaccinations will now be available to all patients for your clinic. </h2><p><br></p><ol><li>Please send a request form for your department.</li><li>once accepted the order will be sent to your logistics after 3 business days</li></ol>",staff_id=2)

    db.session.add_all([announcement1,announcement2,announcement3,announcement4,announcement5])
    db.session.commit()


def undo_announcements():
    db.session.execute('TRUNCATE announcements RESTART IDENTITY CASCADE;')
    db.session.commit()
