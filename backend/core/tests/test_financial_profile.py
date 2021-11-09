from rest_framework.reverse import reverse


def test_create_or_update_financial_profile(
    authenticated_client, transactional_db, authenticated_client_2
):
    response = authenticated_client.post(reverse("financial-profile-list"), data={})
    assert response.status_code == 201

    response = authenticated_client.post(
        reverse("financial-profile-list"), data={"salary": 100000.0}
    )
    assert response.status_code == 200
    assert response.json()["salary"] == 100000.0

    response = authenticated_client.post(
        reverse("financial-profile-list"), data={"salary": 120000.0}
    )

    assert response.status_code == 200
    assert response.json()["salary"] == 120000.0

    response = authenticated_client.post(
        reverse("financial-profile-list"), data={"occupation": "Manager"}
    )

    assert response.status_code == 200
    assert response.json()["salary"] == 120000.0
    assert response.json()["occupation"] == "Manager"

    response = authenticated_client_2.post(
        reverse("financial-profile-list"), data={"occupation": "Manager"}
    )

    assert response.status_code == 201
    assert response.json()["occupation"] == "Manager"

    response = authenticated_client.post(
        reverse("financial-profile-list"), data={"ssn": "123456789"}
    )

    assert response.status_code == 200
    assert response.json()["ssn"] == "123456789"
    assert "passport" in response.json()
