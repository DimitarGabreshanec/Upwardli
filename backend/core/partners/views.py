from django.shortcuts import redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from partners.serializars import ReferralsTrackingSerializer


@api_view(["GET"])  # type: ignore
@permission_classes([IsAuthenticated])  # type: ignore
def partner(request, partner_name: str):
    """
    Redirecting to the partner URL
    """
    data = request.GET.copy()
    data["partner"] = partner_name
    serializer = ReferralsTrackingSerializer(data=data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    serializer.save()  # type: ignore

    url = serializer.validated_data["offer_url"]

    return redirect(url)
