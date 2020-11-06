function sendMail(contactForm) {
    emailjs.send("gmail", "randy", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "movie_request": contactForm.moviesummary.value
        })
        .then(
            function(response) {
                console.log("SUCCESS", response);
            },
            function(error) {
                console.log("FAILED", error);
            }
        );

    return false;
}