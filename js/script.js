// Κώδικας για να αλλάζει η χρονιά αυτόματα

// Πηγαίνε βρες το στοιχείο με το class=year στην HTMl
const YearEl = document.querySelector(".year");

// Η js είναι αντικεμνοστραφής δηλαδή αποθηκεύει δεδομένα μέσω αντικείμενων εδώ φτιάχνεις ένα αντικείμενο ημερομηνίας
// και του βάζεις μέσα την σημερινή χρονιά
const currentYear = new Date().getFullYear();

/*Μέσω της ιδιότητας text-content αλλάξε το περιεχόμενο του text με την τιμή της μεταβλήτης currentYear*/
YearEl.textContent = currentYear;

// Κωδικάς για να ανοίγει και να κλείνει το mobile-menu

/*Διαλέγει το button για το mobile-menu*/
const btnNavEl = document.querySelector(".menu-btn");

/*διαλέγει το header που έχεις στην html γιατί εκει θα προστεθέι το nav-open*/
const HeaderEl = document.querySelector(".main-header");

/*Θέλω όταν κλικάρεται το button να προσθέτει και να αφαίρεις το class .nav-open στο .main-header*/
btnNavEl.addEventListener("click", function () {
  HeaderEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Sticky navigation

/*Να φαίνεται το sticky header μόνο αν είσαι κάτω από το hero-section στο viewport το ίδιο ισχύει και για mobile*/

/*Μια μεταβλήτη sectionHeroEl που εντοπίζει μέσω του query method το στοιχείο με το class hero-section στην HTML*/
const sectionHeroEl = document.querySelector(".section-hero");

/*Ο observer κοιτάζει που βρίσκεται το viewport*/
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      // .hero-section .sticky για να βάζει τo sticky class μέσα στο body μέσω classList σαν parent του header και να ισχύει το margin-top:9.6rem παρόμοια κατάσταση με το accordeon .nav-open
      document.body.classList.add("sticky");
    }

    // Αν φαίνεται το .hero-section βγάλε το sticky
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    /*Που να εμφανίζεται το συγκεκριμενο element null μέσα στο viewport*/
    root: null,
    /*Όταν 0% του hero.section φαίνεται στο viewport να ενεργοποιήθει το sticky event*/
    threshold: 0,
    /*Να εμφανίζεται 80px πιο πριν το sticky καθώς μπλοκάρει το featured-section*/
    // Ο υπολογισμός έρχεται από το fixed-height του sticky που ήταν 8rem για αυτό και διαλέξαμε εδώ αυτή την τιμή για αυτό και βάλαμε fixed-height στο sticky στην CSS
    // Πρέπει να είναι αναγκαστικά px όχι της % η rem
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Smooth scrolling animation

/*queryselectorall διαλέγει όλα τα elements με τύπου :link αν θυμάσαι το accoredon*/
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion αν κλικάρεις σε στοιχείο που έχει μέσα το class=nav-link να βγάζεις το nav-open
    if (link.classList.contains("nav-link"))
      HeaderEl.classList.toggle("nav-open");
  });
});

{
  /* So this is what we call a polyfill,

which is basically a JavaScript library

which implements scroll this functionality for Safari.

<script
      defer
      src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script> */
}
