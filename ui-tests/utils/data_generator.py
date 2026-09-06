import uuid


def generate_unique_email() -> str:
    return f"e2e-{uuid.uuid4().hex[:8]}@example.com"
