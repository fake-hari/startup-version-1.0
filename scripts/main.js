document.addEventListener("DOMContentLoaded", function() {
    let toggleButton1 = document.getElementById('toggleButton1');
    let smallPage1 = document.getElementById('smallPage1');
    let toggleButton2 = document.getElementById('toggleButton2');
    let smallPage2 = document.getElementById('smallPage2');

    toggleButton1.addEventListener('click', function() {
        smallPage1.style.display = (smallPage1.style.display === 'block') ? 'none' : 'block';
        smallPage2.style.display = 'none';
    });

    toggleButton2.addEventListener('click', function() {
        smallPage2.style.display = (smallPage2.style.display === 'block') ? 'none' : 'block';
        smallPage1.style.display = 'none';
    });

    const storiesContainer = document.querySelector('.stories-container');
    const stories = document.querySelectorAll('.story');
    let scrollAmount = 0;
    const scrollStep = 0;
    const delay = 0;

    function scrollStories() {
        storiesContainer.scrollBy({
            top: 0,
            left: scrollStep,
            behavior: 'smooth'
        });
        scrollAmount += scrollStep;

        if (scrollAmount >= storiesContainer.scrollWidth - storiesContainer.clientWidth) {
            scrollAmount = 0;
            storiesContainer.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }

        highlightCenterStory();
        setTimeout(scrollStories, delay);
    }

    function highlightCenterStory() {
        const center = storiesContainer.clientWidth / 2;
        let closestStory = null;
        let closestDistance = Infinity;

        stories.forEach(story => {
            const storyRect = story.getBoundingClientRect();
            const storyCenter = storyRect.left + (storyRect.width / 2);
            const distance = Math.abs(center - storyCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestStory = story;
            }

            story.classList.remove('center-story');
        });

        if (closestStory) {
            closestStory.classList.add('center-story');
        }
    }

    scrollStories();
});