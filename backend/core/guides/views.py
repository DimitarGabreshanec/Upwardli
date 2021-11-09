import django_filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from guides.models import GuideModule, Guide
from guides.schemas import ContentTypeSchema
from guides.serializers import (
    GuideModuleSerializer,
    GuideGuideModuleReadSerializer,
    UserGuideSimpleFormChoiceSerializer,
    GuideSerializer,
    GuideDetailSerializer,
    UserGuideMultiChoiceFormSerializerItems,
    UserGuideMultiChoiceFormSerializer,
)


class GuideViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    serializer_class = GuideSerializer
    pagination_class = None
    queryset = Guide.objects.all().order_by("sort_index")
    permission_classes = [
        IsAuthenticated,
    ]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["guide_type"]
    lookup_field = "slug"

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GuideDetailSerializer(instance, context={"request": request})
        return Response(serializer.data)


class GuideModulesViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    serializer_class = GuideModuleSerializer
    pagination_class = None
    queryset = GuideModule.objects.all().order_by("sort_index")
    permission_classes = [
        IsAuthenticated,
    ]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        "guide",
    ]
    lookup_field = "slug"
    schema = ContentTypeSchema()

    @action(
        detail=False,
        methods=["post"],
        http_method_names=[
            "post",
        ],
        permission_classes=(IsAuthenticated,),
        serializer_class=GuideGuideModuleReadSerializer,
        url_path="mark-guide-as-read",
    )
    def mark_guide_as_read(self, request):
        """Mark guide as read."""
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)

    @action(
        detail=False,
        methods=["post"],
        http_method_names=[
            "post",
        ],
        permission_classes=(IsAuthenticated,),
        serializer_class=UserGuideSimpleFormChoiceSerializer,
        url_path="save-simple-form-results",
    )
    def save_simple_form_results(self, request):
        """Save the results of a simple selection form."""
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)

    @action(
        detail=False,
        methods=["post"],
        http_method_names=[
            "post",
        ],
        permission_classes=(IsAuthenticated,),
        serializer_class=UserGuideMultiChoiceFormSerializerItems,
        url_path="save-multi-choice-form-results",
    )
    def save_multi_choice_form_results(self, request):
        """Save the results of a multi selection form."""
        serializer = self.serializer_class(
            data=request.POST, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        multi_choices_fields_ids = serializer.data["multi_choice_form_item_ids"]
        for multi_choices_fields_id in multi_choices_fields_ids:
            user_guide_multi_choice_form_serializer = (
                UserGuideMultiChoiceFormSerializer(
                    data={"multi_choice_form_item_id": multi_choices_fields_id},
                    context={"request": request},
                )
            )
            user_guide_multi_choice_form_serializer.is_valid(raise_exception=True)
            user_guide_multi_choice_form_serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)
