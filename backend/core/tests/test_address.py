import re

import responses

from tests.defaults import ADDRESS_1, BAD_ADDRESS


@responses.activate
def test_address_lat_lng(map_box_response, use_mapbox_key, address_factory, db):

    responses.add(
        responses.GET,
        "https://api.mapbox.com/geocoding/v5/mapbox.places/US%20New%20York%2095%20Western%20Road%20Kearny,%20NJ%2007032.json?access_token=123123123212",
        json=map_box_response,
        status=200,
        content_type="application/json",
    )
    address = address_factory(**ADDRESS_1)
    address.refresh_from_db()
    assert address.lat == 40.731876
    assert address.lng == -74.114496


@responses.activate
def test_address_api(map_box_response, use_mapbox_key, authenticated_client):

    responses.add(
        responses.GET,
        re.compile("https://api.mapbox.com/geocoding/v5/mapbox.places/*"),
        json=map_box_response,
        status=200,
        content_type="application/json",
    )
    create_resp = authenticated_client.post("/core/api/v1/addresses/", ADDRESS_1)
    assert create_resp.status_code == 201
    assert create_resp.json()["address_line1"] == "95 Western Road"
    assert create_resp.json()["lat"] is None

    get_resp = authenticated_client.get("/core/api/v1/addresses/")
    assert get_resp.json()[0]["lat"] == 40.731876
    assert get_resp.json()[0]["lng"] == -74.114496
