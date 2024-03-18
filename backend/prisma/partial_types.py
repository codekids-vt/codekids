from prisma.models import User, Page

User.create_partial(
    "UserLightNoPassword",
    include={"id": True, "token": True, "name": True, "email": True, "type": True},
)

Page.create_partial(
    "UpdatePage",
    include={"content": True, "image": True, "props": True},
)
