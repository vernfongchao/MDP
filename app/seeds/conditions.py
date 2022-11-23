from app.models import db, Condition

def seed_conditions():

    conditions = [
        Condition(name="Acne",description="Acne is a common skin condition that affects most people at some point. It causes spots, oily skin and sometimes skin that's hot or painful to touch.",type="non-infectious"),
        Condition(name="Acute Pancreatitis",description="Acute pancreatitis is a serious condition where the pancreas becomes inflamed over a short period of time. The pancreas is a small organ located behind the stomach and below the ribcage.",type="physical"),
        Condition(name="Alzheimer's",description="Alzheimer's disease is a progressive condition, which means the symptoms develop gradually and become more severe over the course of several years. It affects multiple brain functions. The first sign of Alzheimer's disease is usually minor memory problems. For example, this could be forgetting about recent conversations or events, and forgetting the names of places and objects.",type="mental"),
        Condition(name="Anal Cancer",description="Alzheimer's disease is a progressive condition, which means the symptoms develop gradually and become more severe over the course of several years. It affects multiple brain functions. The first sign of Alzheimer's disease is usually minor memory problems. For example, this could be forgetting about recent conversations or events, and forgetting the names of places and objects.",type="cancer"),
        Condition(name="Anxiety",description="Anxiety is a feeling of unease, such as worry or fear, that can be mild or severe.",type="mental"),
        Condition(name="Appendicitis",description="Appendicitis is a painful swelling of the appendix. The appendix is a small, thin pouch about 5-10cm (2-4 inches) long. It's connected to the large intestine, where stools (faeces) are formed.",type="physical"),
        Condition(name="Arthritis",description="Arthritis is a common condition that causes pain and inflammation in a joint.",type="physical"),
        Condition(name="Asbestosis",description="Asbestosis is a chronic (long-term) lung condition caused by prolonged exposure to asbestos.",type="non-infectious"),
        Condition(name="Asthma",description="Asthma is a common long-term condition that can cause coughing, wheezing, chest tightness and breathlessness.",type="non-infectious"),
        Condition(name="Atopic Eczema",description="Atopic eczema, also known as atopic dermatitis, is the most common form of eczema. It mainly affects children, but can also affect adults.",type="immune-mediated"),
        Condition(name="Autism Spectrum Disorder",description="Autism spectrum disorder (ASD), usually called autism, is something you're born with. Autism means that the way you think about and experience the world is different to most people. This means you can behave differently to most people, and have different strengths and difficulties. For example, some autism characteristics (things you think, feel and do) can make it hard to express yourself in social situations, but you may also be particularly knowledgeable and passionate about topics that interest you.",type="mental"),
        Condition(name="Common Allergies",description="Allergies are an immune response triggered by allergens, an ordinarily harmful substance.",type="immune-mediated"),
        Condition(name="Conjunctivitis",description="Conjunctivitis, an inflammation of the transparent membrane (conjunctiva) that lines your eyelids and part of your eyeballs, has several possible causes. It could be a bacterial or viral infection, an allergic reaction to pollen or animal dander, or a result of chemical irritants (smoke, chlorine, lens solution, etc.).",type="infectious"),
        Condition(name="Diarrhea",description="Diarrhea — loose, watery and possibly more-frequent bowel movements — is a common problem. It may be present alone or be associated with other symptoms, such as nausea, vomiting, abdominal pain or weight loss.",type="non-infectious"),
        Condition(name="Headaches",description="There are countless causes of headaches, which differ for each person, so you'll have to do some experimenting to figure out the cause of your pain. Fortunately, the vast majority of headaches are primary headaches, not the result of underlying medical conditions. The three most common types are cluster, tension-type, and migraine.",type="non-infectious"),
        Condition(name="Influenza",description="Upper respiratory infection, meaning they involve your nose, throat, and lungs. Viruses cause both colds and flu by increasing inflammation of the membranes in the nose and throat.",type="infectious"),
    ]

    db.session.add_all(conditions)
    db.session.commit()

    # physical diseases, 
    # mental diseases, 
    # infectious diseases,
    # non-infectious diseases, 
    # deficiency diseases, 
    # inherited diseases, 
    # degenerative diseases, 
    # social diseases, 
    # self-inflicted diseases.
    # immune-mediated diseases

def undo_conditions():
    db.session.execute('TRUNCATE conditions RESTART IDENTITY CASCADE;')
    db.session.commit()
