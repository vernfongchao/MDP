from app.models import db, Announcement


def seed_announcements():
    announcement1 = Announcement(title="New Mask Mandate",content="Mask is now required to be worn in the premises of the Hospital at all times. Patients must wear masks inside the hospital or they will be revoked entry and be removed from the premises",staff_id=5)
    announcement2 = Announcement(title="Change in Hazardous Materials Disposal ",content="Hazardous Materials must be bagged into the new Pylon Plastic bags and to be disposed Ward B garbage location.",staff_id=1)
    announcement3 = Announcement(title="Welcome Dr. Vern Chao",content="Dr.Vern Chao is a newly MD hire appointed to the Adult Clinic. He previously worked as the Red Cross Hospital in Syria for over 20 years providing care for the unfortunates. We are happy to welcome Dr.Vern Chao into our staff.",staff_id=3)
    announcement4 = Announcement(title="Happy Birthday Katerina Kreibich",content="We would like to wish Katerina a happy birthday. She has been with us for over 5 years providing therapy for low income families.",staff_id=4)
    announcement5 = Announcement(title="Flu Vaccinations 9/22/2022",content="Flu Vaccinations will now be avaiable to all patients for your clinic. Please send a request form for how much you would like to acquire for your department.",staff_id=2)

    db.session.add_all([announcement1,announcement2,announcement3,announcement4,announcement5])
    db.session.commit()


def undo_announcements():
    db.session.execute('TRUNCATE announcements RESTART IDENTITY CASCADE;')
    db.session.commit()
