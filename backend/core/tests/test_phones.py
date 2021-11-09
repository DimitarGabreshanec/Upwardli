from django.urls import reverse

PHONES_FOR_TESTING = [
    "+442083661177",
    "+12001230101",
    "+120 01230102",
    "12001230103",
    "+1-200-123-01-04",
    "+1(200)1230105",
    "1(200)1230106",
    "+442083661178 ",
]


def test_phones(authenticated_client, user, authenticated_client_2, user_2):
    url = reverse("phones:phones-list")
    for phone_number in PHONES_FOR_TESTING:
        resp = authenticated_client.post(url, {"phone": phone_number})
        assert resp.status_code == 201

    resp = authenticated_client.get(url)
    assert resp.json()["count"] == 8
    assert resp.json()["results"][0]["phone"] == "+442083661177"
    assert resp.json()["results"][6]["phone"] == "+12001230106"

    url = reverse("phones:user_phones", kwargs={"opk": user.opk})
    resp = authenticated_client.get(url)
    assert resp.json()[0]["phone"] == "+442083661177"
    assert resp.json()[6]["phone"] == "+12001230106"

    url = reverse("phones:user_phones", kwargs={"opk": user_2.opk})
    resp = authenticated_client_2.get(url)
    assert resp.json() == []
