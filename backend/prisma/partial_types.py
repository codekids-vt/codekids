from prisma.models import User

User.create_partial(
    "UserLightNoPassword",
    include={"id": True, "token": True, "name": True, "email": True, "type": True},
)
