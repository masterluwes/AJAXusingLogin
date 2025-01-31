// Function to validate password before proceeding to the next form
function validatePasswordBeforeNext(event) {
    let password = document.querySelector("input[name='password']").value;
    let confirmPassword = document.querySelector("input[name='confirm-password']").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please check and try again.");
        event.preventDefault();
        return false; // Prevent proceeding to the next section
    }
    return true;
}

// Function to show the next form
function showNextForm() {
    document.querySelector('.form.first').style.display = 'none';
    document.querySelector('.form.second').style.display = 'block';
}

// Function to show the previous form section
function showPreviousForm(event) {
    event.preventDefault(); // Prevent form submission
    document.querySelector('.form.second').style.display = 'none';
    document.querySelector('.form.first').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function () {
    let registerBtn = document.querySelector(".submitBtn");
    let loginBtn = document.querySelector(".btn");
    let nextBtn = document.querySelector(".nextBtn");

    if (registerBtn) {
        registerBtn.addEventListener("click", function (event) {
            if (!validatePasswordBeforeNext(event)) {
                return; // Prevent multiple alerts and submission
            }
            registerUser();
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            loginUser();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", function (event) {
            event.preventDefault();
            if (validatePasswordBeforeNext(event)) {
                showNextForm();
            }
        });
    }
});

// Updated registerUser function
function registerUser(event) {
    event.preventDefault(); // Prevent default form submission

    if (!validatePasswordBeforeNext(event)) {
        return; // Stop execution if passwords do not match
    }

    let formData = new FormData(document.querySelector("form"));
    let jsonObject = {};
    
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    // Send email & password to save_user.php
    let xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "save_user.php", true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            let response = JSON.parse(xhr1.responseText);
            alert(response.message);
        }
    };
    xhr1.send("email=" + encodeURIComponent(jsonObject.email) + "&password=" + encodeURIComponent(jsonObject.password));

    // Send full user details to save_user_details.php
    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "save_user_details.php", true);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200) {
            let response = JSON.parse(xhr2.responseText);
            alert(response.message);
            if (response.status === "success") {
                window.location.href = "login.html";
            }
        }
    };
    xhr2.send(JSON.stringify(jsonObject));
}

// For Login
function loginUser() {
    let email = document.querySelector("input[name='email']").value;
    let password = document.querySelector("input[name='password']").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                let response = JSON.parse(xhr.responseText);
                alert(response.message);
                if (response.status === "success") {
                    window.location.href = "./kiosk/index.html"; // Redirect to kiosk upon successful login
                }
            } catch (error) {
                console.error("Invalid JSON response from server:", xhr.responseText);
                alert("An error occurred while processing your login request.");
            }
        }
    };
    xhr.send("email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    let registerBtn = document.querySelector(".submitBtn");
    let loginBtn = document.querySelector(".btn");

    if (registerBtn) {
        registerBtn.addEventListener("click", registerUser);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", loginUser);
    }
});

function populate(s1, s2, s3, s5) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    var s3 = document.getElementById(s3);
    var s5 = document.getElementById(s5);
    s2.innerHTML = "";
    s3.innerHTML = "";
    s5.innerHTML = "";

    // Add default "Select Province" and "Select City/Town" options
    var defaultOptionProvince = document.createElement("option");
    defaultOptionProvince.value = "";
    defaultOptionProvince.innerHTML = "--Select Province--";
    s2.appendChild(defaultOptionProvince);

    var defaultOptionCity = document.createElement("option");
    defaultOptionCity.value = "";
    defaultOptionCity.innerHTML = "--Select City/Town--";
    s3.appendChild(defaultOptionCity);

    var defaultDistrictOption = document.createElement("option");
    defaultDistrictOption.value = "";
    defaultDistrictOption.innerHTML = "--Select District--";
    s5.appendChild(defaultDistrictOption);

    var provinces = {
        "ncr": ["Metro Manila"],
        "r1": ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
        "r2": ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
        "r3": ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
        "r4a": ["Cavite", "Laguna", "Batangas", "Rizal", "Quezon"],
        "r4b": ["Occidental Mindoro", "Oriental Mindoro", "Marinduque", "Romblon", "Palawan"],
        "r5": ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
        "r6": ["Aklan", "Antique", "Capiz", "Iloilo", "Negros Occidental", "Guimaras"],
        "r7": ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
        "r8": ["Eastern Samar", "Leyte", "Northern Samar", "Western Samar", "Southern Samar", "Biliran"],
        "r9": ["Zamboanga del Norte", "Zamboanga Sibugay", "Zamboanga del Sur"],
        "r10": ["Bukidnon", "Camiguin", "Lanao del Norte", "Misamis Occidental", "Misamis Oriental"],
        "r11": ["Compostela Valley", "Davao del Norte", "Davao Occidental", "Davao Oriental", "Davao del Sur", "Davao City"],
        "r12": ["Cotabato", "South Cotabato", "Sultan Kudarat", "Sarangani", "Cotabato City"],
        "r13": ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Dinagat Island"],
        "r14": ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga-Apayao", "Mountain Province"],
        "r15": ["Basilan", "Lanao del Sur", "Maguindanao", "Sulu", "Tawi-tawi"]
    };

    var citiesInMetroManila = ["Caloocan City", "Las Piñas City", "Makati City", "Malabon City", "Mandaluyong City",
        "Manila City", "Marikina City", "Muntinlupa City", "Navotas City", "Parañaque City",
        "Pasay City", "Pasig City", "Pateros", "Quezon City", "San Juan City",
        "Taguig City", "Valenzuela City"];

    if (s1.value in provinces) {
        provinces[s1.value].forEach(function (province) {
            var option = document.createElement("option");
            option.value = province;
            option.innerHTML = province;
            s2.appendChild(option);
        });
    }

    if (s1.value === "ncr") {
        citiesInMetroManila.forEach(function (city) {
            var cityOption = document.createElement("option");
            cityOption.value = city;
            cityOption.innerHTML = city;
            s3.appendChild(cityOption);
        });
    }

    // Reset the dropdown to the default unselected option
    s2.selectedIndex = 0;
    s3.selectedIndex = 0;
}

function populateCities(province, citySelectId, districtSelectId) {
    var s3 = document.getElementById(citySelectId);
    var s5 = document.getElementById(districtSelectId);
    s3.innerHTML = "";
    s5.innerHTML = "";

    var defaultOptionCity = document.createElement("option");
    defaultOptionCity.value = "";
    defaultOptionCity.innerHTML = "--Select City/Town--";
    s3.appendChild(defaultOptionCity);

    var defaultDistrictOption = document.createElement("option");
    defaultDistrictOption.value = "";
    defaultDistrictOption.innerHTML = "--Select District--";
    s5.appendChild(defaultDistrictOption);

    if (province === "Metro Manila") {
        var citiesInMetroManila = [
            "Caloocan City", "Las Piñas City", "Makati City", "Malabon City",
            "Mandaluyong City", "Manila City", "Marikina City",
            "Muntinlupa City", "Navotas City", "Parañaque City",
            "Pasay City", "Pasig City", "Pateros", "Quezon City",
            "San Juan City", "Taguig City", "Valenzuela City"
        ];

        citiesInMetroManila.forEach(function (city) {
            var option = document.createElement("option");
            option.value = city;
            option.innerHTML = city;
            s3.appendChild(option);
        });
    }

    s3.selectedIndex = 0;
}

function populateDistricts(city, districtSelectId) {
    var s5 = document.getElementById(districtSelectId);
    s5.innerHTML = "";

    var defaultDistrictOption = document.createElement("option");
    defaultDistrictOption.value = "";
    defaultDistrictOption.innerHTML = "--Select District--";
    s5.appendChild(defaultDistrictOption);

    var districtsInManila = [
        "Binondo", "Ermita", "Intramuros", "Malate", "Paco",
        "Pandacan", "Port Area", "Quiapo", "Sampaloc",
        "San Andres", "San Miguel", "San Nicolas",
        "Santa Ana", "Santa Cruz", "Santa Mesa", "Tondo"
    ];

    var districtsInMalabon = [
        "District 1", "District 2"
    ];

    var districtsInMarikina = [
        "1st District", "2nd District"
    ];

    var districtsInValenzuela = [
        "Valenzuela 1st District", "Valenzuela 2nd District"
    ];

    var districtsInCaloocan = [
        "Sangandaan", "Dagat-Dagatan", "Poblacion", "Kaunlaran Village",
        "Maypajo", "University Hills", "Grace Park West", "Grace Park East",
        "Morning Breeze", "Barrio San Jose", "Balintawak", "Bagong Barrio West",
        "Bagong Barrio East", "Libis Baesa/Reparo", "Santa Quiteria", "Talipapa"
    ];

    var districtsInQuezon = [
        "QC District 1", "QC District 2", "QC District 3", "QC District 4", "QC District 5", "QC District 6"
    ];

    var districtsInLasPinas = [
        "Las Piñas 1st District", "Las Piñas 2nd District"
    ];

    var districtsInMakati = [
        "1st Congressional District", "2nd Congressional District"
    ];

    var districtsInMandaluyong = [
        "Mandaluyong 1st District", "Mandaluyong 2nd District"
    ];

    var districtsInMuntinlupa = [
        "Muntinlupa 1st District", "Muntinlupa 2nd District"
    ];

    var districtsInNavotas = [
        "Navotas District I", "Navotas District II"
    ];

    var districtsInParañaque = [
        "Parañaque 1st District", "Parañaque 2nd District"
    ];

    var districtsInPasay = [
        "Pasay Lone District"
    ];

    var districtsInPasig = [
        "Pasig 1st District", "Pasig 2nd District"
    ];

    var districtsInPateros = [
        "N/A"
    ];

    var districtsInSanJuan = [
        "San Juan District I", "San Juan District II"
    ];

    var districtsInTaguig = [
        "Taguig District I", "Taguig District II"
    ];

    if (city === "Manila City") {
        districtsInManila.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Malabon City") {
        districtsInMalabon.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Marikina City") {
        districtsInMarikina.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Caloocan City") {
        districtsInCaloocan.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Valenzuela City") {
        districtsInValenzuela.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Quezon City") {
        districtsInQuezon.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Las Piñas City") {
        districtsInLasPinas.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Makati City") {
        districtsInMakati.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Mandaluyong City") {
        districtsInMandaluyong.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Muntinlupa City") {
        districtsInMuntinlupa.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Navotas City") {
        districtsInNavotas.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Parañaque City") {
        districtsInParañaque.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Pasay City") {
        districtsInPasay.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Pasig City") {
        districtsInPasig.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Pateros") {
        districtsInPateros.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "San Juan City") {
        districtsInSanJuan.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    if (city === "Taguig City") {
        districtsInTaguig.forEach(function (district) {
            var option = document.createElement("option");
            option.value = district;
            option.innerHTML = district;
            s5.appendChild(option);
        });
    }

    s5.selectedIndex = 0;
}

function populateBarangays(district, barangaySelectId) {
    var s4 = document.getElementById(barangaySelectId);
    s4.innerHTML = "";

    var defaultBarangayOption = document.createElement("option");
    defaultBarangayOption.value = "";
    defaultBarangayOption.innerHTML = "--Select Barangay--";
    s4.appendChild(defaultBarangayOption);

    var barangays = {
        "Binondo": ["Barangay 287", "Barangay 288", "Barangay 289", "Barangay 290", "Barangay 291", "Barangay 292", "Barangay 293", "Barangay 294", "Barangay 295", "Barangay 296"],
        "Ermita": ["Barangay 659", "Barangay 659-A", "Barangay 660", "Barangay 660-A", "Barangay 661", "Barangay 663", "Barangay 663-A", "Barangay 664", "Barangay 666", "Barangay 667", "Barangay 668", "Barangay 669", "Barangay 670"],
        "Intramuros": ["Barangay 654", "Barangay 655", "Barangay 656", "Barangay 657", "Barangay 658"],
        "Malate": ["Barangay 688", "Barangay 689", "Barangay 690", "Barangay 691", "Barangay 692", "Barangay 693", "Barangay 694", "Barangay 695", "Barangay 696", "Barangay 697", "Barangay 698", "Barangay 699", "Barangay 700", "Barangay 701", "Barangay 702",
            "Barangay 703", "Barangay 704", "Barangay 705", "Barangay 706", "Barangay 707", "Barangay 708", "Barangay 709", "Barangay 710", "Barangay 711", "Barangay 712", "Barangay 713", "Barangay 714", "Barangay 715", "Barangay 716", "Barangay 717",
            "Barangay 718", "Barangay 719", "Barangay 720", "Barangay 721", "Barangay 722", "Barangay 723", "Barangay 724", "Barangay 725", "Barangay 726", "Barangay 727", "Barangay 728", "Barangay 729", "Barangay 730", "Barangay 731", "Barangay 732",
            "Barangay 733", "Barangay 734", "Barangay 735", "Barangay 736", "Barangay 737", "Barangay 738", "Barangay 739", "Barangay 740", "Barangay 741", "Barangay 742", "Barangay 743", "Barangay 744"],
        "Paco": [
            "Barangay 671", "Barangay 672", "Barangay 673", "Barangay 674", "Barangay 675",
            "Barangay 676", "Barangay 677", "Barangay 678", "Barangay 679", "Barangay 680",
            "Barangay 681", "Barangay 682", "Barangay 683", "Barangay 684", "Barangay 685",
            "Barangay 686", "Barangay 687",
            "Barangay 809", "Barangay 810", "Barangay 811", "Barangay 812", "Barangay 813",
            "Barangay 814", "Barangay 815", "Barangay 816", "Barangay 817", "Barangay 818",
            "Barangay 819", "Barangay 820", "Barangay 821", "Barangay 822", "Barangay 823",
            "Barangay 824", "Barangay 825", "Barangay 826", "Barangay 827", "Barangay 828",
            "Barangay 829", "Barangay 830", "Barangay 831", "Barangay 832"
        ],
        "Pandacan": [
            "Barangay 833", "Barangay 834", "Barangay 835", "Barangay 836", "Barangay 837",
            "Barangay 838", "Barangay 839", "Barangay 840", "Barangay 841", "Barangay 842",
            "Barangay 843", "Barangay 844", "Barangay 845", "Barangay 846", "Barangay 847",
            "Barangay 848", "Barangay 849", "Barangay 850", "Barangay 851", "Barangay 852",
            "Barangay 853", "Barangay 855", "Barangay 856", "Barangay 857",
            "Barangay 858", "Barangay 859", "Barangay 860", "Barangay 861", "Barangay 862",
            "Barangay 863", "Barangay 864", "Barangay 865", "Barangay 867",
            "Barangay 868", "Barangay 869", "Barangay 870", "Barangay 871", "Barangay 872"
        ],
        "Port Area": ["Barangay 649", "Barangay 650", "Barangay 651", "Barangay 652", "Barangay 653"],
        "Quiapo": [
            "Barangay 306", "Barangay 307", "Barangay 308", "Barangay 309",
            "Barangay 383", "Barangay 384", "Barangay 385", "Barangay 386", "Barangay 387", "Barangay 388",
            "Barangay 389", "Barangay 390", "Barangay 391", "Barangay 392", "Barangay 393", "Barangay 394"
        ],
        "Sampaloc": [
            "Barangay 395", "Barangay 396", "Barangay 397", "Barangay 398", "Barangay 399",
            "Barangay 400", "Barangay 401", "Barangay 402", "Barangay 403", "Barangay 404",
            "Barangay 405", "Barangay 406", "Barangay 407", "Barangay 408", "Barangay 409",
            "Barangay 410", "Barangay 411", "Barangay 412", "Barangay 413", "Barangay 414",
            "Barangay 415", "Barangay 416", "Barangay 417", "Barangay 418", "Barangay 419",
            "Barangay 420", "Barangay 421", "Barangay 422", "Barangay 423", "Barangay 424",
            "Barangay 425", "Barangay 426", "Barangay 427", "Barangay 428", "Barangay 429",
            "Barangay 430", "Barangay 431", "Barangay 432", "Barangay 433", "Barangay 434",
            "Barangay 435", "Barangay 436", "Barangay 437", "Barangay 438", "Barangay 439",
            "Barangay 440", "Barangay 441", "Barangay 442", "Barangay 443", "Barangay 444",
            "Barangay 445", "Barangay 446", "Barangay 447", "Barangay 448", "Barangay 449",
            "Barangay 450", "Barangay 451", "Barangay 452", "Barangay 453", "Barangay 454",
            "Barangay 455", "Barangay 456", "Barangay 457", "Barangay 458", "Barangay 459",
            "Barangay 460", "Barangay 461", "Barangay 462", "Barangay 463", "Barangay 464",
            "Barangay 465", "Barangay 466", "Barangay 467", "Barangay 468", "Barangay 469",
            "Barangay 470", "Barangay 471", "Barangay 472", "Barangay 473", "Barangay 474",
            "Barangay 475", "Barangay 476", "Barangay 477", "Barangay 478", "Barangay 479",
            "Barangay 480", "Barangay 481", "Barangay 482", "Barangay 483", "Barangay 484",
            "Barangay 485", "Barangay 486", "Barangay 487", "Barangay 488", "Barangay 489",
            "Barangay 490", "Barangay 491", "Barangay 492", "Barangay 493", "Barangay 494",
            "Barangay 495", "Barangay 496", "Barangay 497", "Barangay 498", "Barangay 499",
            "Barangay 500", "Barangay 501", "Barangay 502", "Barangay 503", "Barangay 504",
            "Barangay 505", "Barangay 506", "Barangay 507", "Barangay 508", "Barangay 509",
            "Barangay 510", "Barangay 511", "Barangay 512", "Barangay 513", "Barangay 514",
            "Barangay 515", "Barangay 516", "Barangay 517", "Barangay 518", "Barangay 519",
            "Barangay 520", "Barangay 521", "Barangay 522", "Barangay 523", "Barangay 524",
            "Barangay 525", "Barangay 526", "Barangay 527", "Barangay 528", "Barangay 529",
            "Barangay 530", "Barangay 531", "Barangay 532", "Barangay 533", "Barangay 534",
            "Barangay 535", "Barangay 536", "Barangay 537", "Barangay 538", "Barangay 539",
            "Barangay 540", "Barangay 541", "Barangay 542", "Barangay 543", "Barangay 544",
            "Barangay 545", "Barangay 546", "Barangay 547", "Barangay 548", "Barangay 549",
            "Barangay 550", "Barangay 551", "Barangay 552", "Barangay 553", "Barangay 554",
            "Barangay 555", "Barangay 556", "Barangay 557", "Barangay 558", "Barangay 559",
            "Barangay 560", "Barangay 561", "Barangay 562", "Barangay 563", "Barangay 564",
            "Barangay 565", "Barangay 566", "Barangay 567", "Barangay 568", "Barangay 569",
            "Barangay 570", "Barangay 571", "Barangay 572", "Barangay 573", "Barangay 574",
            "Barangay 575", "Barangay 576", "Barangay 577", "Barangay 578", "Barangay 579",
            "Barangay 580", "Barangay 581", "Barangay 582", "Barangay 583", "Barangay 584",
            "Barangay 585", "Barangay 586"
        ],
        "San Andres": [
            "Barangay 745", "Barangay 746", "Barangay 747", "Barangay 748", "Barangay 749",
            "Barangay 750", "Barangay 751", "Barangay 752", "Barangay 753", "Barangay 754",
            "Barangay 755", "Barangay 756", "Barangay 757", "Barangay 758", "Barangay 759",
            "Barangay 760", "Barangay 761", "Barangay 762", "Barangay 763", "Barangay 764",
            "Barangay 765", "Barangay 766", "Barangay 767", "Barangay 768", "Barangay 769",
            "Barangay 770", "Barangay 771", "Barangay 772", "Barangay 773", "Barangay 774",
            "Barangay 775", "Barangay 776", "Barangay 777", "Barangay 778", "Barangay 779",
            "Barangay 780", "Barangay 781", "Barangay 782", "Barangay 783", "Barangay 784",
            "Barangay 785", "Barangay 786", "Barangay 787", "Barangay 788", "Barangay 789",
            "Barangay 790", "Barangay 791", "Barangay 792", "Barangay 793", "Barangay 794",
            "Barangay 795", "Barangay 796", "Barangay 797", "Barangay 798", "Barangay 799",
            "Barangay 800", "Barangay 801", "Barangay 802", "Barangay 803", "Barangay 804",
            "Barangay 805", "Barangay 806", "Barangay 807", "Barangay 808", "Barangay 818-A"
        ],
        "San Miguel": ["Barangay 637", "Barangay 638", "Barangay 639", "Barangay 640", "Barangay 641", "Barangay 642", "Barangay 643", "Barangay 644", "Barangay 645", "Barangay 646", "Barangay 647", "Barangay 648"],
        "San Nicolas": [
            "Barangay 268", "Barangay 269", "Barangay 270", "Barangay 271", "Barangay 272",
            "Barangay 273", "Barangay 274", "Barangay 275", "Barangay 276",
            "Barangay 281", "Barangay 282", "Barangay 283", "Barangay 284", "Barangay 285", "Barangay 286"
        ],
        "Santa Ana": ["Barangay 866", "Barangay 873", "Barangay 874", "Barangay 875", "Barangay 876", "Barangay 877",
            "Barangay 878", "Barangay 879", "Barangay 880", "Barangay 881", "Barangay 882",
            "Barangay 883", "Barangay 884", "Barangay 885", "Barangay 886", "Barangay 887",
            "Barangay 888", "Barangay 889", "Barangay 890", "Barangay 891", "Barangay 892",
            "Barangay 893", "Barangay 894", "Barangay 895", "Barangay 896", "Barangay 897",
            "Barangay 898", "Barangay 899", "Barangay 900", "Barangay 901", "Barangay 902",
            "Barangay 903", "Barangay 904", "Barangay 905"],
        "Santa Cruz": [
            "Barangay 297", "Barangay 298", "Barangay 299", "Barangay 300", "Barangay 301",
            "Barangay 302", "Barangay 303", "Barangay 304", "Barangay 305", "Barangay 310", "Barangay 311",
            "Barangay 312", "Barangay 313", "Barangay 314", "Barangay 315", "Barangay 316",
            "Barangay 317", "Barangay 318", "Barangay 319", "Barangay 320", "Barangay 321",
            "Barangay 322", "Barangay 323", "Barangay 324", "Barangay 325", "Barangay 326",
            "Barangay 327", "Barangay 328", "Barangay 329", "Barangay 330", "Barangay 331",
            "Barangay 332", "Barangay 333", "Barangay 334", "Barangay 335", "Barangay 336",
            "Barangay 337", "Barangay 338", "Barangay 339", "Barangay 340", "Barangay 341",
            "Barangay 342", "Barangay 343", "Barangay 344", "Barangay 345", "Barangay 346",
            "Barangay 347", "Barangay 348", "Barangay 349", "Barangay 350", "Barangay 351",
            "Barangay 352", "Barangay 353", "Barangay 354", "Barangay 355", "Barangay 356",
            "Barangay 357", "Barangay 358", "Barangay 359", "Barangay 360", "Barangay 361",
            "Barangay 362", "Barangay 363", "Barangay 364", "Barangay 365", "Barangay 366",
            "Barangay 367", "Barangay 368", "Barangay 369", "Barangay 370", "Barangay 371",
            "Barangay 372", "Barangay 373", "Barangay 374", "Barangay 375", "Barangay 376",
            "Barangay 377", "Barangay 378", "Barangay 379", "Barangay 380", "Barangay 381",
            "Barangay 382"
        ],
        "Santa Mesa": [
            "Barangay 587", "Barangay 587-A", "Barangay 588", "Barangay 589", "Barangay 590", "Barangay 591",
            "Barangay 592", "Barangay 593", "Barangay 594", "Barangay 595", "Barangay 596",
            "Barangay 597", "Barangay 598", "Barangay 599", "Barangay 600", "Barangay 601",
            "Barangay 602", "Barangay 603", "Barangay 604", "Barangay 605", "Barangay 606",
            "Barangay 607", "Barangay 608", "Barangay 609", "Barangay 610", "Barangay 611",
            "Barangay 612", "Barangay 613", "Barangay 614", "Barangay 615", "Barangay 616",
            "Barangay 617", "Barangay 618", "Barangay 619", "Barangay 620", "Barangay 621",
            "Barangay 622", "Barangay 623", "Barangay 624", "Barangay 625", "Barangay 626",
            "Barangay 627", "Barangay 628", "Barangay 629", "Barangay 630", "Barangay 631",
            "Barangay 632", "Barangay 633", "Barangay 634", "Barangay 635", "Barangay 636"
        ],
        "Tondo": [
            "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5",
            "Barangay 6", "Barangay 7", "Barangay 8", "Barangay 9", "Barangay 10",
            "Barangay 11", "Barangay 12", "Barangay 13", "Barangay 14", "Barangay 15",
            "Barangay 16", "Barangay 17", "Barangay 18", "Barangay 19", "Barangay 20",
            "Barangay 21", "Barangay 22", "Barangay 23", "Barangay 24", "Barangay 25",
            "Barangay 26", "Barangay 27", "Barangay 28", "Barangay 29", "Barangay 30",
            "Barangay 31", "Barangay 32", "Barangay 33", "Barangay 34", "Barangay 35",
            "Barangay 36", "Barangay 37", "Barangay 38", "Barangay 39", "Barangay 40",
            "Barangay 41", "Barangay 42", "Barangay 43", "Barangay 44", "Barangay 45",
            "Barangay 46", "Barangay 47", "Barangay 48", "Barangay 49", "Barangay 50",
            "Barangay 51", "Barangay 52", "Barangay 53", "Barangay 54", "Barangay 55",
            "Barangay 56", "Barangay 57", "Barangay 58", "Barangay 59", "Barangay 60",
            "Barangay 61", "Barangay 62", "Barangay 63", "Barangay 64", "Barangay 65",
            "Barangay 66", "Barangay 67", "Barangay 68", "Barangay 69", "Barangay 70",
            "Barangay 71", "Barangay 72", "Barangay 73", "Barangay 74", "Barangay 75",
            "Barangay 76", "Barangay 77", "Barangay 78", "Barangay 79", "Barangay 80",
            "Barangay 81", "Barangay 82", "Barangay 83", "Barangay 84", "Barangay 85",
            "Barangay 86", "Barangay 87", "Barangay 88", "Barangay 89", "Barangay 90",
            "Barangay 91", "Barangay 92", "Barangay 93", "Barangay 94", "Barangay 95",
            "Barangay 96", "Barangay 97", "Barangay 98", "Barangay 99", "Barangay 100",
            "Barangay 101", "Barangay 102", "Barangay 103", "Barangay 104", "Barangay 105",
            "Barangay 106", "Barangay 107", "Barangay 108", "Barangay 109", "Barangay 110",
            "Barangay 111", "Barangay 112", "Barangay 113", "Barangay 114", "Barangay 115",
            "Barangay 116", "Barangay 117", "Barangay 118", "Barangay 119", "Barangay 120",
            "Barangay 121", "Barangay 122", "Barangay 123", "Barangay 124", "Barangay 125",
            "Barangay 126", "Barangay 127", "Barangay 128", "Barangay 129", "Barangay 130",
            "Barangay 131", "Barangay 132", "Barangay 133", "Barangay 134", "Barangay 135",
            "Barangay 136", "Barangay 137", "Barangay 138", "Barangay 139", "Barangay 140",
            "Barangay 141", "Barangay 142", "Barangay 143", "Barangay 144", "Barangay 145",
            "Barangay 146", "Barangay 147", "Barangay 148", "Barangay 149", "Barangay 150",
            "Barangay 151", "Barangay 152", "Barangay 153", "Barangay 154", "Barangay 155",
            "Barangay 156", "Barangay 157", "Barangay 158", "Barangay 159", "Barangay 160",
            "Barangay 161", "Barangay 162", "Barangay 163", "Barangay 164", "Barangay 165",
            "Barangay 166", "Barangay 167", "Barangay 168", "Barangay 169", "Barangay 170",
            "Barangay 171", "Barangay 172", "Barangay 173", "Barangay 174", "Barangay 175",
            "Barangay 176", "Barangay 177", "Barangay 178", "Barangay 179", "Barangay 180",
            "Barangay 181", "Barangay 182", "Barangay 183", "Barangay 184", "Barangay 185",
            "Barangay 186", "Barangay 187", "Barangay 188", "Barangay 189", "Barangay 190",
            "Barangay 191", "Barangay 192", "Barangay 193", "Barangay 194", "Barangay 195",
            "Barangay 196", "Barangay 197", "Barangay 198", "Barangay 199", "Barangay 200",
            "Barangay 201", "Barangay 202", "Barangay 202-A", "Barangay 203", "Barangay 204", "Barangay 205",
            "Barangay 206", "Barangay 207", "Barangay 208", "Barangay 209", "Barangay 210",
            "Barangay 211", "Barangay 212", "Barangay 213", "Barangay 214", "Barangay 215",
            "Barangay 216", "Barangay 217", "Barangay 218", "Barangay 219", "Barangay 220",
            "Barangay 221", "Barangay 222", "Barangay 223", "Barangay 224", "Barangay 225",
            "Barangay 226", "Barangay 227", "Barangay 228", "Barangay 229", "Barangay 230",
            "Barangay 231", "Barangay 232", "Barangay 233", "Barangay 234", "Barangay 235",
            "Barangay 236", "Barangay 237", "Barangay 238", "Barangay 239", "Barangay 240",
            "Barangay 241", "Barangay 242", "Barangay 243", "Barangay 244", "Barangay 245",
            "Barangay 246", "Barangay 247", "Barangay 248", "Barangay 249", "Barangay 250",
            "Barangay 251", "Barangay 252", "Barangay 253", "Barangay 254", "Barangay 255",
            "Barangay 256", "Barangay 257", "Barangay 258", "Barangay 259", "Barangay 260",
            "Barangay 261", "Barangay 262", "Barangay 263", "Barangay 264", "Barangay 265",
            "Barangay 266", "Barangay 267"
        ],

        //Marikina District
        "1st District": [
            "Barangka",
            "Calumpang",
            "Industrial Valley",
            "Jesus de la Peña",
            "Malanday",
            "San Roque",
            "Santa Elena",
            "Santo Niño",
            "Tañong"
        ],
        "2nd District": [
            "Concepcion Uno",
            "Concepcion Dos",
            "Fortune",
            "Marikina Heights",
            "Nangka",
            "Parang",
            "Tumana"
        ],

        // Barangays in Malabon
        "District 1": [
            "Baritan", "Bayan-Bayanan", "Catmon", "Concepcion",
            "Dampalit", "Flores", "Hulong Duhat", "Ibaba",
            "Maysilo", "Muzon", "Niugan", "Panghulo",
            "San Agustin", "Santulan", "Tañong"
        ],
        "District 2": [
            "Acacia", "Longos", "Potrero", "Tinajeros",
            "Tonsuya", "Tugatog"
        ],

        // Barangays in Caloocan
        "Sangandaan": [
            "Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5", "Barangay 6", "Barangay 7"
        ],
        "Dagat-Dagatan": [
            "Barangay 8", "Barangay 12", "Barangay 14", "Barangay 28",
        ],
        "Poblacion": [
            "Barangay 9", "Barangay 10", "Barangay 11"
        ],
        "Kaunlaran Village": [
            "Barangay 20", "Barangay 21", "Barangay 22", "Barangay 23", "Barangay 24"
        ],
        "Maypajo": [
            "Barangay 25", "Barangay 26",
        ],
        "Marulas": [
            "Barangay 37", "Barangay 36"
        ],
        "University Hills": [
            "University Hills"
        ],
        "Grace Park West": [
            "Grace Park West"
        ],
        "Grace Park East": [
            "Grace Park East"
        ],
        "Morning Breeze": [
            "Morning Breeze"
        ],
        "Barrio San Jose": [
            "Barrio San Jose"
        ],
        "Balintawak": [
            "Balintawak"
        ],
        "Bagong Barrio West": [
            "Bagong Barrio West"
        ],
        "Bagong Barrio East": [
            "Bagong Barrio East"
        ],
        "Libis Baesa/Reparo": [
            "Libis Baesa/Reparo"
        ],
        "Santa Quiteria": [
            "Santa Quiteria"
        ],
        "Talipapa": [
            "Talipapa"
        ],

        //District in Valenzuela
        "Valenzuela 1st District": [
            "Arkong Bato", "Balangkas", "Bignay", "Bisig", "Canumay East", "Canumay West", "Coloong", "Dalandanan", "Isla", "Lawang Bato", "Lingunan", "Mabolo", "Malanday", "Malinta", "Palasan", "Pariancillo Villa", "Pasolo", "Poblacion", "Polo", "Punturin", "Rincon", "Tagalag", "Viente Reales", "Wawang Pulo"
        ],
        "Valenzuela 2nd District": [
            "Bagbaguin", "Gen T. de Leon", "Karuhatan", "Mapulang Lupa", "Marulas", "Maysan", "Parada", "Paso de Blas", "Ugong"
        ],

        //District in Quezon City
        "QC District 1": ["Alicia", "Bagong Pag-asa", "Bahay Toro", "Balingasa", "Bungad", "Damar", "Damayan", "Del Monte", "Katipunan", "Mariblo", "Masambong", "N.S. Amoranto (Gintong Silahis)", "Nayong Kanluran", "Paang Bundok", "Pag-ibig sa Nayon", "Paltok", "Paraiso", "Phil-Am", "Ramon Magsaysay", "Salvacion", "San Antonio", "San Isidro Labrador", "San Jose", "Santa Cruz", "Santa Teresita", "Santo Cristo", "Talayan", "Veterans Village", "West Triangle"
        ],
        "QC District 2": ["Bagong Silangan", "Batasan Hills", "Commonwealth", "Holy Spirit", "Payatas"
        ],
        "QC District 3": ["Amihan", "Bagumbuhay", "Bagumbayan", "Bayanihan", "Blue Ridge A", "Blue Ridge B", "Camp Aguinaldo", "Claro", "Dioquino Zobel", "Duyan-Duyan", "E. Rodriguez", "East Kamias", "Escopa I", "Escopa II", "Escopa III", "Escopa IV", "Libis", "Loyola Heights", "Mangga", "Marilag", "Masagana", "Matandang Balara", "Milagrosa", "Pansol", "Quirino 2-A", "Quirino 2-B", "Quirino 2-C", "Quirino 3-A", "Saint Ignatius", "San Roque", "Silangan", "Socorro", "Tagumpay", "Ugong Norte", "Villa Maria Clara", "West Kamias", "White Plains"
        ],
        "QC District 4": ["Bagong Lipunan ng Crame", "Botocan", "Central", "Kristong Hari", "Damayang Lagi", "Doña Aurora", "Doña Imelda", "Doña Josefa", "Don Manuel", "East Triangle", "Horseshoe", "Immaculate Conception", "Kalusugan", "Kamuning", "Kaunlaran", "Krus na Ligas", "Laging Handa", "Malaya", "Mariana", "Obrero", "Old Capitol Site", "Paligsahan", "Pinyahan", "Pinagkaisahan", "Roxas", "Sacred Heart", "San Isidro Galas", "San Martin de Porres", "San Vicente", "Santo Niño", "Santol", "Sikatuna Village", "South Triangle", "Tatalon", "Teachers Village East", "Teachers Village West", "U.P. Campus", "U.P. Village", "Valencia"
        ],
        "QC District 5": ["Bagbag", "Capri", "Fairview", "Greater Lagro", "Gulod", "Kaligayahan", "Nagkaisang Nayon", "North Fairview", "Novaliches Proper", "Pasong Putik Proper", "San Agustin", "San Bartolome", "Santa Lucia", "Santa Monica"
        ],
        "QC District 6": ["Apolonio Samson", "Baesa", "Balon-Bato", "Culiat", "New Era", "Pasong Tamo", "Sangandaan", "Sauyo", "Talipapa", "Tandang Sora", "Unang Sigaw"
        ],

        //District in Las Pinas
        "Las Piñas 1st District": ["BF International Village", "Daniel Fajardo", "Elias Aldana", "Ilaya", "Manuyo Uno", "Manuyo Dos", "Pamplona Uno", "Pamplona Tres", "Pulang Lupa Uno", "Pulang Lupa Dos", "Talon Uno", "Zapote"
        ],
        "Las Piñas 2nd District": ["Almanza Uno", "Almanza Dos", "Pamplona Dos", "Pilar", "Talon Dos", "Talon Tres", "Talon Kuatro", "Talon Singko"
        ],

        //District in Makati
        "1st Congressional District": ["Bangkal", "Bel-Air", "Carmona", "Dasmariñas", "Forbes Park", "Kasilawan", "La Paz", "Magallanes", "Olympia", "Palanan", "Pio del Pilar", "Poblacion", "San Antonio", "San Isidro", "San Lorenzo", "Santa Cruz", "Singkamas", "Tejeros", "Urdaneta", "Valenzuela"
        ],
        "2nd Congressional District": ["Guadalupe Nuevo", "Guadalupe Viejo", "Pinagkaisahan"
        ],

        //Districts in Mandaluyong
        "Mandaluyong 1st District": ["Addition Hills", "Bagong Silang", "Burol", "Daang Bakal", "Hagdan Bato Itaas", "Hagdan Bato Libis", "Harapin Ang Bukas", "Highway Hills", "Mauway", "New Zañiga", "Pag-Asa", "Pleasant Hills", "Poblacion", "Wack-Wack Greenhills"
        ],
        "Mandaluyong 2nd District": ["Barangka Drive", "Barangka Ibaba", "Barangka Ilaya", "Barangka Itaas", "Buayang Bato", "Hulo", "Mabini–J.Rizal", "Malamig", "Namayan", "Old Zañiga", "Plainview", "San Jose", "Vergara"
        ],

        //Districts in Muntinlupa
        "Muntinlupa 1st District": ["Bayanan", "Poblacion", "Putatan", "Tunasan",
        ],
        "Muntinlupa 2nd District": ["Alabang", "Ayala Alabang", "Buli", "Cupang", "Sucat"
        ],

        //Districts in Navotas
        "Navotas District I": ["Bagumbayan North", "Bagumbayan South", "Bangkulasi", "Navotas East", "Navotas West", "NBBS Dagat-dagatan", "NBBS Kaunlaran", "NBBS Proper", "North Bay Boulevard North", "San Rafael Village", "Sipac Almacen"
        ],
        "Navotas District II": ["Daanghari", "San Jose", "San Roque", "Tangos North", "Tangos South", "Tanza 1", "Tanza 2"
        ],

        //District in Parañaque
        "Parañaque 1st District": ["Baclaran", "Don Galo", "La Huerta", "San Dionisio", "San Isidro", "Santo Niño", "Tambo", "Vitalez"],
        "Parañaque 2nd District": ["BF Homes", "Don Bosco", "Marcelo Green", "Merville", "Moonwalk", "San Antonio", "San Martin de Porres", "Sun Valley"],

        //District in Pasay
        "Pasay Lone District": ["Apelo Cruz", "Baclaran", "Baltao", "Bay City", "Cabrera", "Cartimar", "Cuyegkeng", "Don Carlos Village", "Edang", "F. B. Harrison", "Juan Sumulong", "Kalayaan", "Leveriza", "Libertad", "Malibay", "Manila Bay Reclamation", "Marcela Marcelo", "Maricaban", "M. Dela Cruz", "Newport City", "Nichols", "Padre Burgos", "Pasay Rotonda", "Philippine International Convention Center", "Pildera I", "Pildera II", "Rivera Village", "San Pablo", "San Isidro", "San Jose", "San Rafael", "San Roque", "Santa Clara", "Santo Niño", "Tramo", "Tripa de Gallina", "Ventanilla", "Villamor"],

        //District in Pasig
        "Pasig 1st District": ["Bagong Ilog", "Bagong Katipunan", "Bambang", "Buting", "Caniogan", "Kalawaan", "Kapasigan", "Kapitolyo", "Malinao", "Oranbo", "Palatiw", "Pineda", "Sagad", "San Antonio", "San Joaquin", "San Jose", "San Nicolas", "Santa Cruz", "Santa Rosa", "Santo Tomas", "Sumilang", "Ugong"],

        "Pasig 2nd District": ["Dela Paz", "Manggahan", "Maybunga", "Pinagbuhatan", "Rosario", "San Miguel", "Santa Lucia", "Santolan"],

        //District in Pateros   
        "N/A": ["Aguho", "Magtanggol", "Martirez del 96", "Poblacion", "San Pedro", "San Roque", "Santa Ana", "Santo Rosario–Kanluran", "Santo Rosario–Silangan", "Tabacalera"],

        //District in San Juan
        "San Juan District I": ["Balong-Bato", "Batis", "Corazón de Jesús", "Ermitaño", "Pasadeña", "Pedro Cruz", "Progreso", "Rivera", "Salapán", "San Perfecto"],

        "San Juan District II": ["Addition Hills", "Greenhills", "Isabelita", "Kabayanan", "Little Baguio", "Maytunas", "Onse", "Saint Joseph", "Santa Lucia", "Tibagan", "West Crame"],

        //District in Taguig
        "Taguig District I": ["Bagumbayan", "Bambang", "Calzada-Tipas", "Comembo", "Hagonoy", "Ibayo-Tipas", "Ligid-Tipas", "Lower Bicutan", "Napindan", "New Lower Bicutan", "Palingon-Tipas", "Pembo", "Rizal", "San Miguel", "Santa Ana", "Tuktukan", "Ususan", "Wawa"],

        "Taguig District II": ["Cembo", "Central Bicutan", "Central Signal Village", "East Rembo", "Fort Bonifacio", "Katuparan", "Maharlika Village", "North Daang Hari", "North Signal Village", "Pinagsama", "Pitogo", "Post Proper Northside", "Post Proper Southside", "South Cembo", "South Daang Hari", "South Signal Village", "Tanyag", "Upper Bicutan", "West Rembo", "Western Bicutan"]

    };

    if (district in barangays) {
        barangays[district].forEach(function (barangay) {
            var option = document.createElement("option");
            option.innerHTML = barangay;
            s4.appendChild(option);
        });
    }

    s4.selectedIndex = 0;
    s5.selectedIndex = 0;
}