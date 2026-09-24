from prisma.models import Page, User

User.create_partial(
    "UserLightNoPassword",
    include={"id": True, "token": True, "name": True, "email": True, "type": True},
)

Page.create_partial(
    "UpdatePage",
    include={"content": True, "image": True, "props": True},
)
