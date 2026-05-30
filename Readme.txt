==============================================================================
                    DINEFIND - RESTAURANT PLATFORM
                              README
==============================================================================

PROJECT: Restaurant Discovery and Reservation Platform
Assignment: COS10005 - Web Development
Date: 31 May 2026

==============================================================================
WEBSITE STRUCTURE
==============================================================================

File Organization:
assignment2/
├── index.html              (Home page - platform introduction)
├── restaurants.html        (Restaurant listing - 6 restaurants)
├── recommend.html          (Recommendation form with matching)
├── register.html           (User registration form)
├── reservation.html        (Booking form)
├── css/
│   └── style.css          (Responsive stylesheet - 330 lines)
├── js/
│   └── script.js          (Validation and logic - 355 lines)
└── images/                (Restaurant images folder)
    ├── restaurant1.jpg
    ├── restaurant2.jpg
    ├── restaurant3.jpg
    ├── restaurant4.jpg
    ├── restaurant5.jpg
    └── restaurant6.jpg

HTML Pages:

index.html - Home page introducing the platform with features, target users,
and how the platform works. Includes navigation to all other pages.

restaurants.html - Displays 6 restaurants with full details: name, cuisine
type, description, signature dishes with prices, price range per person,
deposit amount, and image. Each restaurant has a "Reserve Now" button.

recommend.html - Recommendation form with three dropdown menus for user
preferences (dietary preference, budget range, dining purpose). JavaScript
evaluates selections and displays matching restaurants based on scoring logic.

register.html - User registration form with 9 fields: username, email, phone,
password, confirm password, gender, dietary preferences, country/region, and
submit button. All fields have JavaScript validation.

reservation.html - Booking form with: personal information (name, email, phone),
reservation details (restaurant, date, time, party size, special requests),
deposit amount (auto-calculated), payment method selection (voucher or online),
and billing information. Form validates all fields before submission.

CSS - Responsive design with mobile (≤767px), tablet (768-1023px), and desktop
(≥1024px) breakpoints. Includes navigation styling, form styling, card components,
and accessibility features (color contrast, readable fonts, heading hierarchy,
focus states for keyboard navigation).

JavaScript - Contains form validation for registration (8 validations) and
reservation (9 validations), recommendation engine with rule-based matching
(3-factor scoring), and dynamic features (deposit calculation, conditional
payment fields, auto-fill billing email, navigation highlighting).

==============================================================================
GITHUB REPOSITORY LINK
==============================================================================

Repository Link: https://github.com/Jayme-coding/wd_assign2_105300297

==============================================================================
EXPLANATION OF JAVASCRIPT VALIDATION LOGIC (In Plain English)
==============================================================================

REGISTRATION FORM VALIDATION (8 checks):

Username Check:
The username field must be at least 5 characters long and can only contain
letters (a-z, A-Z), numbers (0-9), and underscores. If the user enters
something that doesn't match this pattern, an error message appears saying
"Username: 5+ chars, letters/numbers/underscore only".

Email Check:
The email must follow a valid email format with text, an @ symbol, a domain
name, a dot, and an extension (like text@domain.com). If not, error message:
"Invalid email format".

Phone Check:
The phone number must contain 8 to 15 digits. The validation removes all
non-digit characters (spaces, dashes, etc.) and then counts only the digits.
Error message: "Phone must be 8-15 digits".

Password Check:
The password must be at least 10 characters long AND must contain:
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*()_+-=[]{}etc)
If any of these are missing, error message explains what's needed.

Confirm Password Check:
The password confirmation field must exactly match the password field. If they
don't match, error: "Passwords do not match".

Gender Selection Check:
User must select one of the radio buttons (Male, Female, or Other). If none
is selected, error: "Select gender".

Country Selection Check:
User must select a country from the dropdown menu. If not selected, error:
"Select country".

Form Submission:
The form checks all 8 validations when the user clicks submit. If any single
validation fails, the form does not submit and the user sees the error messages.
Only when all 8 checks pass does the form actually send the data.

RESERVATION FORM VALIDATION (9 checks):

Full Name Check:
Required field - cannot be empty.

Email Check:
Must be valid email format (same pattern as registration).

Phone Check:
Must contain at least 10 digits (different from registration which allows 8-15).
Validation removes non-digits first.

Restaurant Selection Check:
User must select a restaurant from the dropdown. Cannot be empty.

Reservation Date Check:
Date cannot be in the past. The system gets today's date and compares. If the
selected date is before today, error: "Cannot book in the past".

Reservation Time Check:
Time field is required - cannot be empty.

Party Size Check:
Must be a number greater than 0. Cannot be zero or negative.

Payment Method Conditional Check:
Two payment options: Voucher or Online Payment.
- If Voucher selected: Shows voucher code field (no validation required)
- If Online Payment selected: Shows credit card field and validates:
  - Visa/Mastercard: Must be exactly 16 digits
  - American Express: Must be exactly 15 digits
  - Validation only checks digit count, not if card is real

Billing Email Check:
Must be valid email format (same pattern as other email fields).

Form Submission:
All 9 checks must pass before form submits. If any fail, error messages appear
and form does not submit.

RECOMMENDATION ENGINE (Rule-Based Matching):

The recommendation engine scores each restaurant on three factors:

Factor 1 - Dietary Preference Match:
If the restaurant supports the user's dietary choice (vegan, vegetarian, halal,
gluten-free, or none), the restaurant gets 3 points. Otherwise 0 points.

Factor 2 - Budget Range Match:
If the restaurant's price tier matches the user's budget selection (budget,
moderate, or upscale), the restaurant gets 3 points. Otherwise 0 points.

Factor 3 - Dining Purpose Match:
If the restaurant is suitable for the user's occasion (family, date, business,
or casual), the restaurant gets 3 points. Otherwise 0 points.

Scoring Results:
Maximum possible score: 9 points (all three factors match)
Restaurants with 0 points are excluded from results
Results are sorted by score (highest first)

Example:
- User wants: Vegetarian, Moderate budget, Date night
- Restaurant A: Has vegetarian options (+3), moderate price (+3), good for dates (+3) = 9 points (shown first)
- Restaurant B: Has vegetarian options (+3), expensive (-0), good for families (-0) = 3 points (shown lower)
- Restaurant C: Only no restrictions option (-0), budget-friendly (+3), casual only (-0) = 3 points

==============================================================================
KNOWN ISSUES & LIMITATIONS
==============================================================================

1. No Database Backend
   - Registration form is frontend-only with no data persistence
   - All validation happens on the client side only (browser)
   - Form submits to a test endpoint for assignment purposes
   - In a real application, server-side validation would be required

2. Image Placeholders
   - Image paths reference restaurant1.jpg through restaurant6.jpg
   - These are placeholder paths and must be populated with actual images
   - All images have descriptive alt text for accessibility

3. Credit Card Validation
   - Only validates the format (16 digits for Visa/Mastercard, 15 for Amex)
   - Does NOT validate if the card is real or valid
   - No real payment processing occurs
   - Use fake card numbers for testing (e.g., 4111111111111111)

4. Mercury Server Deployment
   - Form action URLs contain placeholder student ID: it000000
   - Must be updated with actual student ID before submission
   - File names are case-sensitive on Mercury server

5. Browser Compatibility
   - Uses HTML5 date and time input types
   - Some older browsers may not support these input types
   - Designed for modern browsers (Chrome, Firefox, Safari, Edge)

6. Responsive Design Limitations
   - Tested on common breakpoints (mobile 767px, tablet 1023px, desktop)
   - May not display perfectly on unusual screen sizes

==============================================================================
REFERENCES & ATTRIBUTIONS
==============================================================================

Images:
- All restaurant images are placeholder images
- Recommended sources for replacement images: Unsplash, Pexels, Pixabay
- If using images from these sources, attribution format:
  "Image from Unsplash.com" or "Free stock photo from Pexels.com"

Code & Techniques:
- HTML5 semantic elements based on W3C standards
- CSS Grid and Flexbox for responsive layouts
- JavaScript form validation using regex patterns and DOM manipulation
- No external frameworks or libraries used

==============================================================================

STUDENT ID: 105300297
STUDENT NAME: Ratanak Mom
SUBMISSION DATE: 31 May 2026

==============================================================================
