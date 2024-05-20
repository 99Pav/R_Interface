document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingForm = document.getElementById('ratingForm');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const ratingCategory = star.parentElement;
            ratingCategory.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
            star.style.color = '#f39c12';

            let prevSibling = star.previousElementSibling;
            while (prevSibling) {
                prevSibling.classList.add('selected');
                prevSibling = prevSibling.previousElementSibling;
            }

            let nextSibling = star.nextElementSibling;
            while (nextSibling) {
                nextSibling.classList.remove('selected');
                nextSibling.style.color = '#ccc';
                nextSibling = nextSibling.nextElementSibling;
            }
        });
    });

    ratingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const ratings = {};
        document.querySelectorAll('.rating').forEach(rating => {
            const category = rating.getAttribute('data-name');
            const selectedStar = rating.querySelector('.star.selected');
            if (selectedStar) {
                ratings[category] = ratings[category] || [];
                ratings[category].push(selectedStar.getAttribute('data-value'));
            }
        });

        const formData = new FormData(ratingForm);
        Object.keys(ratings).forEach(category => {
            ratings[category].forEach(value => formData.append(category, value));
        });

        fetch('save_ratings.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Ratings submitted successfully!');
            } else {
                alert('There was an error submitting the ratings.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
