// DineFind - Restaurant Reservation Platform

// Restaurant data
const restaurantData = {
    'Giardino Pizza': { deposit: 50, price: 'moderate', diet: ['vegetarian', 'none'], use: ['date', 'business', 'casual'] },
    'Supper Inn': { deposit: 40, price: 'moderate', diet: ['vegetarian', 'none'], use: ['family', 'casual'] },
    'Tekami Sushi': { deposit: 60, price: 'upscale', diet: ['vegan', 'gluten-free', 'none'], use: ['date', 'business', 'casual'] },
    'Le Petit Bistro': { deposit: 70, price: 'upscale', diet: ['vegetarian', 'none'], use: ['date', 'business'] },
    'Tasty Cambodian': { deposit: 35, price: 'budget', diet: ['vegetarian', 'none'], use: ['family', 'casual', 'date'] },
    'GYG': { deposit: 45, price: 'moderate', diet: ['vegetarian', 'none'], use: ['family', 'casual'] }
};

// Setup on page load
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Handle restaurant pre-selection
    const params = new URLSearchParams(window.location.search);
    const rest = params.get('restaurant');
    if (rest && document.getElementById('restaurantSelect')) {
        document.getElementById('restaurantSelect').value = rest;
        updateDeposit();
    }
    
    // Setup forms
    if (document.getElementById('registrationForm')) setupRegForm();
    if (document.getElementById('reservationForm')) setupResForm();
    if (document.getElementById('recommendationForm')) setupRecForm();
});

// ===== REGISTRATION FORM =====
function setupRegForm() {
    const form = document.getElementById('registrationForm');
    
    document.getElementById('username').addEventListener('blur', checkUsername);
    document.getElementById('email').addEventListener('blur', checkEmail);
    document.getElementById('phone').addEventListener('blur', checkPhone);
    document.getElementById('password').addEventListener('blur', checkPassword);
    document.getElementById('confirmPassword').addEventListener('blur', checkConfirm);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let ok = true;
        
        if (!checkUsername()) ok = false;
        if (!checkEmail()) ok = false;
        if (!checkPhone()) ok = false;
        if (!checkPassword()) ok = false;
        if (!checkConfirm()) ok = false;
        if (!document.querySelector('input[name="gender"]:checked')) {
            document.getElementById('genderError').textContent = 'Select gender';
            ok = false;
        } else {
            document.getElementById('genderError').textContent = '';
        }
        if (!document.getElementById('country').value) {
            document.getElementById('countryError').textContent = 'Select country';
            ok = false;
        } else {
            document.getElementById('countryError').textContent = '';
        }
        
        if (ok) form.submit();
    });
}

function checkUsername() {
    const u = document.getElementById('username').value.trim();
    const err = document.getElementById('usernameError');
    if (!u || !/^[a-zA-Z0-9_]{5,}$/.test(u)) {
        err.textContent = 'Username: 5+ chars, letters/numbers/underscore only';
        return false;
    }
    err.textContent = '';
    return true;
}

function checkEmail() {
    const e = document.getElementById('email').value.trim();
    const err = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!e || !emailRegex.test(e)) {
        err.textContent = 'Invalid email format';
        return false;
    }
    err.textContent = '';
    return true;
}

function checkPhone() {
    const p = document.getElementById('phone').value.replace(/\D/g, '');
    const err = document.getElementById('phoneError');
    if (!p || p.length < 8 || p.length > 15) {
        err.textContent = 'Phone must be 8-15 digits';
        return false;
    }
    err.textContent = '';
    return true;
}

function checkPassword() {
    const pw = document.getElementById('password').value;
    const err = document.getElementById('passwordError');
    if (!pw || pw.length < 10) {
        err.textContent = 'Password must be at least 10 characters';
        return false;
    }
    if (!/[A-Z]/.test(pw) || !/[a-z]/.test(pw) || !/[0-9]/.test(pw)) {
        err.textContent = 'Password needs uppercase, lowercase, and number';
        return false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) {
        err.textContent = 'Password needs a special character';
        return false;
    }
    err.textContent = '';
    return true;
}

function checkConfirm() {
    const pw = document.getElementById('password').value;
    const cpw = document.getElementById('confirmPassword').value;
    const err = document.getElementById('confirmPasswordError');
    if (pw !== cpw) {
        err.textContent = 'Passwords do not match';
        return false;
    }
    err.textContent = '';
    return true;
}

// ===== RESERVATION FORM =====
function setupResForm() {
    const form = document.getElementById('reservationForm');
    
    document.getElementById('restaurantSelect').addEventListener('change', updateDeposit);
    
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', togglePayment);
    });
    
    const sameEmail = document.getElementById('sameAsEmail');
    if (sameEmail) {
        sameEmail.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('billingEmail').value = document.getElementById('reservationEmail').value;
            } else {
                document.getElementById('billingEmail').value = '';
            }
        });
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let ok = true;
        
        // Check all fields
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('reservationEmail').value.trim();
        const phone = document.getElementById('reservationPhone').value.replace(/\D/g, '');
        const date = new Date(document.getElementById('reservationDate').value);
        const people = parseInt(document.getElementById('numPeople').value);
        const billEmail = document.getElementById('billingEmail').value.trim();
        
        if (!name) {
            document.getElementById('fullNameError').textContent = 'Name required';
            ok = false;
        } else {
            document.getElementById('fullNameError').textContent = '';
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('reservationEmailError').textContent = 'Valid email required';
            ok = false;
        } else {
            document.getElementById('reservationEmailError').textContent = '';
        }
        
        if (!phone || phone.length < 10) {
            document.getElementById('reservationPhoneError').textContent = 'Phone needs at least 10 digits';
            ok = false;
        } else {
            document.getElementById('reservationPhoneError').textContent = '';
        }
        
        if (!document.getElementById('restaurantSelect').value) {
            document.getElementById('restaurantError').textContent = 'Select a restaurant';
            ok = false;
        } else {
            document.getElementById('restaurantError').textContent = '';
        }
        
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            document.getElementById('reservationDateError').textContent = 'Cannot book in the past';
            ok = false;
        } else {
            document.getElementById('reservationDateError').textContent = '';
        }
        
        if (!document.getElementById('reservationTime').value) {
            document.getElementById('reservationTimeError').textContent = 'Time required';
            ok = false;
        } else {
            document.getElementById('reservationTimeError').textContent = '';
        }
        
        if (!people || people <= 0) {
            document.getElementById('numPeopleError').textContent = 'Must be at least 1 person';
            ok = false;
        } else {
            document.getElementById('numPeopleError').textContent = '';
        }
        
        // Payment validation
        const payMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (payMethod && payMethod.value === 'online') {
            const card = document.getElementById('creditCardNumber').value.replace(/\D/g, '');
            if (!card || (card.length !== 16 && card.length !== 15)) {
                document.getElementById('creditCardNumberError').textContent = 'Card: 16 digits (Visa/MC) or 15 (Amex)';
                ok = false;
            } else {
                document.getElementById('creditCardNumberError').textContent = '';
            }
        }
        
        if (!billEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billEmail)) {
            document.getElementById('billingEmailError').textContent = 'Valid billing email required';
            ok = false;
        } else {
            document.getElementById('billingEmailError').textContent = '';
        }
        
        if (ok) form.submit();
    });
}

function updateDeposit() {
    const r = document.getElementById('restaurantSelect').value;
    const dep = r && restaurantData[r] ? restaurantData[r].deposit : 0;
    document.getElementById('depositAmount').value = '$' + dep.toFixed(2);
}

function togglePayment() {
    const m = document.querySelector('input[name="paymentMethod"]:checked').value;
    const vg = document.getElementById('voucherGroup');
    const cg = document.getElementById('creditCardGroup');
    
    if (m === 'voucher') {
        vg.style.display = 'block';
        cg.style.display = 'none';
        document.getElementById('creditCardNumber').value = '';
    } else {
        vg.style.display = 'none';
        cg.style.display = 'block';
        document.getElementById('voucherCode').value = '';
    }
}

// ===== RECOMMENDATION ENGINE =====
function setupRecForm() {
    const form = document.getElementById('recommendationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const diet = document.getElementById('dietaryPref').value;
        const budget = document.getElementById('budgetRange').value;
        const purpose = document.getElementById('diningPurpose').value;
        
        const results = [];
        
        // Check each restaurant
        for (const [name, data] of Object.entries(restaurantData)) {
            let score = 0;
            let reasons = [];
            
            if (data.diet.includes(diet)) {
                score += 3;
                reasons.push('Matches your dietary preference');
            }
            
            if (data.price === budget) {
                score += 3;
                reasons.push('Perfect for your budget');
            }
            
            if (data.use.includes(purpose)) {
                score += 3;
                reasons.push('Great for ' + purpose);
            }
            
            if (score > 0) {
                results.push({ name, score, reasons });
            }
        }
        
        results.sort((a, b) => b.score - a.score);
        
        const div = document.getElementById('recommendedRestaurants');
        div.innerHTML = '';
        
        if (results.length === 0) {
            div.innerHTML = '<p>No restaurants match. Try different preferences.</p>';
        } else {
            results.forEach(r => {
                const html = '<div class="recommended-card"><h3>' + r.name + '</h3>';
                const reasonsList = r.reasons.map(x => '<li>' + x + '</li>').join('');
                const card = html + '<ul>' + reasonsList + '</ul><a href="reservation.html?restaurant=' + 
                    encodeURIComponent(r.name) + '" class="btn btn-primary reserve-btn">Reserve at ' + r.name + '</a></div>';
                div.innerHTML += card;
            });
        }
        
        document.getElementById('recommendationResults').style.display = 'block';
    });
}
