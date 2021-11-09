from typing import List, Dict, Any

from django.db import IntegrityError

from guides.models import GuideStepContentType
from tests.factories.guides_factories import (
    GuideFactory,
    GuideModuleFactory,
    GuideStepFactory,
    GuideStaticPageFactory,
    GuideStaticPageListWithIconsFactory,
    GuideSimpleFormFactory,
    GuideSimpleFormChoicesFactory,
)

GUIDES: List[Dict[str, Any]] = [
    {
        "title": "Upwardli Basics",
        "slug": "upwardli-basics",
        "reading_time": "5 min",
        "sort_index": 1,
    },
    {
        "title": "Personalize your experience",
        "slug": "personalize-your-experience",
        "reading_time": "5 min",
        "sort_index": 2,
    },
    {
        "title": "Understanding the US Financial System",
        "slug": "understanding-the-us-financial-system",
        "reading_time": "5 min",
        "sort_index": 3,
    },
    {
        "title": "Sending Money Internationally",
        "slug": "sending-money-internationally",
        "reading_time": "5 min",
        "sort_index": 4,
    },
    {
        "title": "Bank Accounts 101",
        "slug": "bank-accounts-101",
        "reading_time": "5 min",
        "sort_index": 5,
    },
    {
        "title": "Credit Cards 101",
        "slug": "credit-cards-101",
        "reading_time": "5 min",
        "sort_index": 6,
    },
]

GUIDE_1_MODULES: List[Dict[str, Any]] = [
    {
        "title": "Meet Upwardli",
        "slug": "meet-upwardli",
        "sort_index": 1,
    },
    {
        "title": "How Upwardli works",
        "slug": "how-upwardli-works",
        "sort_index": 2,
    },
    {
        "title": "Personalize your experience",
        "slug": "personalize-your-experience",
        "sort_index": 3,
    },
    {
        "title": "Get started",
        "slug": "get-started",
        "sort_index": 4,
    },
]

GUIDE_1_MODULE_1_STEPS: List[Dict[str, Any]] = [
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "How Upwardli works",
        "sort_index": 1,
    },
]

GUIDE_1_MODULE_2_STEPS: List[Dict[str, Any]] = [
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "Get rewarded",
        "sort_index": 1,
    },
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "Take a quiz to earn your first reward",
        "sort_index": 2,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 3,
    },
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "Learn about Guides",
        "sort_index": 4,
    },
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "Personalize your Guides",
        "sort_index": 5,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 6,
    },
]

GUIDE_1_MODULE_3_STEPS: List[Dict[str, Any]] = [
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "So, tell us about you!",
        "sort_index": 1,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 2,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 3,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 4,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 5,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 6,
    },
    {
        "content_type": GuideStepContentType.SIMPLE_CHOICE_FORM,
        "button_text": "next",
        "sort_index": 7,
    },
    {
        "content_type": GuideStepContentType.STATIC_PAGE,
        "button_text": "Explore Your Guides",
        "sort_index": 8,
    },
]


class SeedGuides:
    def __init__(self, stdout, stderr):
        self.stdout = stdout
        self.stderr = stderr
        self.guides = []
        self.modules = {}

    def create_guides(self):
        """Create guides fabric."""
        try:
            self.get_or_create_guides()
        except IntegrityError as ex:
            self.stderr.write("{}".format(ex))
        try:
            self.get_or_create_modules(self.guides[0])
        except IntegrityError as ex:
            self.stderr.write("{}".format(ex))
        try:
            self.get_or_create_modules_steps()
        except IntegrityError as ex:
            self.stderr.write("{}".format(ex))
        try:
            self.get_or_create_steps_content_for_guide_1()
        except IntegrityError as ex:
            self.stderr.write("{}".format(ex))

    def get_or_create_guides(self) -> None:
        """Get or create guides."""
        self.stdout.write("Seeding guides table")
        for guide in GUIDES:
            self.guides.append(GuideFactory.create(**guide))

    def get_or_create_modules(self, guide) -> None:
        """Get or create modules."""
        self.stdout.write("Seeding guides modules table")
        for module in GUIDE_1_MODULES:
            self.modules[module["slug"]] = GuideModuleFactory.create(
                **module, guide=guide
            )

    def get_or_create_modules_steps(self) -> None:
        """Get or create steps."""
        self.stdout.write("Seeding guides modules steps table")
        for step in GUIDE_1_MODULE_1_STEPS:
            GuideStepFactory.create(
                **step, guide_module=self.modules[GUIDE_1_MODULES[0]["slug"]]
            )

        for step in GUIDE_1_MODULE_2_STEPS:
            GuideStepFactory.create(
                **step, guide_module=self.modules[GUIDE_1_MODULES[1]["slug"]]
            )

        for step in GUIDE_1_MODULE_3_STEPS:
            GuideStepFactory.create(
                **step, guide_module=self.modules[GUIDE_1_MODULES[2]["slug"]]
            )

    def get_or_create_steps_content_for_guide_1(self) -> None:
        """Get or create steps content."""
        # module 1 step 1
        GuideStaticPageFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[0]["slug"]].steps.all()[0],
            title="Welcome to Upwardli!",
            text="Upwardli is your personal guide to the U.S. financial system. \
                 We build you step-by-step guides to reach your financial goals fast – \
                 everything from building credit to finding the best services - \
                 and reward you for making progress along the way. \
                 This Guide shows you how Upwardli works and how we help you win your financial life. \
                 Let’s get your journey started!",
            video_url="https://link_to_vedeo.webm",
        )

        # module 2 step 1 STATIC_PAGE
        GuideStaticPageFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[0],
            title="Knowledge is power",
            text="Upwardli helps you navigate financial life with confidence.",
        )

        # module 2 step 2 STATIC_PAGE
        page_for_module_2_step_2 = GuideStaticPageFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[1],
            title="Knowledge is power",
            text="Upwardli helps you navigate financial life with confidence.",
        )

        # module 2 step 2 list

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_2,
            text="The 'For you' section shows you the next steps in "
            "your financial journey and the rewards you’ve earned",
            sort_index=1,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_2,
            text="'Guides' gives you personalized step-by-step guides to "
            "master key financial topics and get tailored recommendations",
            sort_index=2,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_2,
            text="'Credit' is your home base to monitor and improve your "
            "credit score with personalized credit boosting plans",
            sort_index=3,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_2,
            text="'Offers' shows you services that match your interests",
            sort_index=4,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_2,
            text="Profile’ is where your personal details live and where you can manage your preferences",
            sort_index=5,
        )

        # module 2 step 3 SIMPLE_CHOICE_FORM

        simple_form_for_module_2_step_3 = GuideSimpleFormFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[2],
            title="How confident are you in your knowledge of the US financial system?",
        )

        # module 2 step 3 SIMPLE_FORM_CHOICES

        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_3,
            sort_index=1,
            text="a. I’m an expert",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_3,
            sort_index=2,
            text="b. I was raised here, so I know a little, but wish I knew more.",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_3,
            sort_index=3,
            text="c. I’m new to the U.S. - I am just learning.",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_3,
            sort_index=4,
            text="d. Honestly? Not confident at all - help!",
        )

        # module 2 step 4 STATIC_PAGE

        GuideStaticPageFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[3],
            title="Show a celebration or money in a bank",
            text="Congratulations on earning your first [amount] reward! \
                  Rewards can be managed in the ‘For You’ tab where you can \
                  see what you have earned, how to redeem rewards and how to earn even more. \
                  Now, let’s learn how Upwardli builds personalized Guides to help you win the financial system.",
        )

        # module 2 step 5 STATIC_PAGE
        page_for_module_2_step_5 = GuideStaticPageFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[4],
            title="SIntroducing Upwardli’s personalized financial Guides.",
            text="We build step-by-step Guides to mastering the financial system based on your \
            interests and profile. Each guide teaches you what you need to master the topic and \
            give you customized recommendations to find the best deal for you. \
            To start, you’ll have access to our standard Guides and can add more:",
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="US Financial System Basics",
            sort_index=1,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="The 'Getting Started' Checklist",
            sort_index=2,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="Getting a Bank Account",
            sort_index=3,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="Building Credit Fast",
            sort_index=4,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="Understanding Credit Cards",
            sort_index=5,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="Sending Money Internationally",
            sort_index=6,
        )

        GuideStaticPageListWithIconsFactory.create(
            guide_static_page=page_for_module_2_step_5,
            text="Start Saving Now",
            sort_index=7,
        )

        # module 2 step 6 SIMPLE_CHOICE_FORM

        simple_form_for_module_2_step_6 = GuideSimpleFormFactory.create(
            guide_step=self.modules[GUIDE_1_MODULES[1]["slug"]].steps.all()[5],
            title="How would you prefer that we display our Guides?",
        )

        # module 2 step 6 SIMPLE_FORM_CHOICES

        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_6,
            sort_index=1,
            text="a. Videos with captions",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_6,
            sort_index=2,
            text="b. Text only is fine (with audio to make sure it is all accessible)",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_6,
            sort_index=3,
            text="c. Give me both!",
        )
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=simple_form_for_module_2_step_6,
            sort_index=4,
            text="d. Doesn’t matter to me so long as I can earn rewards!",
        )
