from prisma import Prisma

prisma = Prisma()

# myclient = pymongo.MongoClient(
#     uuidRepresentation="standard",
# )

# database_name = "maternal_health_db"
# if database_name not in myclient.list_database_names():
#     myclient[database_name].create_collection("users")
#     myclient[database_name].create_collection("results")


def get_db():
    return prisma
