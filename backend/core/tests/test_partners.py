from partners.models import ReferralsTracking


def test_partner(authenticated_client):
    offer_url = "https://www.google.com/search?q=url+encoded+url&oq=url+encoded+url&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8"
    data = {
        "next": offer_url,
        "offer_id": "123",
        "offer_touchpoint": "offer_touchpoint",
    }
    resp = authenticated_client.get("/core/partners/partner_name/", data)
    assert resp.status_code == 302
    assert resp.url == offer_url
    redirect_info = ReferralsTracking.objects.last()
    assert redirect_info.offer_url == offer_url
    assert redirect_info.offer_id == "123"
    assert redirect_info.offer_touchpoint == "offer_touchpoint"
    assert redirect_info.partner == "partner_name"
