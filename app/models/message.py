from app.extensions import db
from datetime import datetime
import uuid

class Message(db.Model):
    __tablename__ = "messages"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    session_id = db.Column(db.String(36), nullable=False, index=True, default=lambda: str(uuid.uuid4()))  # ← новое поле
    role = db.Column(db.String(20), nullable=False)  # "user" / "assistant"
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)

    user = db.relationship("User", backref="messages", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "session_id": self.session_id,
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at.isoformat()
        }

    def __repr__(self):
        return f"<Message {self.role} in session {self.session_id} by user {self.user_id}>"