from django.test import TestCase

from .models import ChatMessage


class ChatMessageModelTests(TestCase):
    def test_article_ids_uses_json_field(self):
        field = ChatMessage._meta.get_field("article_ids")
        self.assertEqual(field.get_internal_type(), "JSONField")
