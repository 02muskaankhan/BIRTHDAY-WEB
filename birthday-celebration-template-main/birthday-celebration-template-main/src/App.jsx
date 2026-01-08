import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState } from "react";
import "./App.css";
import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [currentPage, setCurrentPage] = useState(1); // Start at 1 for Countdown page

  // ⚠️ FOR TESTING: Comment out lines 18-21 to reset on every reload
  // Check localStorage to persist birthday reached state
 const [birthdayReached, setBirthdayReached] = useState(() => {
  const saved = localStorage.getItem("birthdayReached");
  return saved === "true";
});



  // ✅ FOR TESTING: Uncomment this line to always show countdown on reload
  // const [birthdayReached, setBirthdayReached] = useState(false);

  const [showEffects, setShowEffects] = useState(false);

  const page1Ref = useRef(null); // Countdown page
  const page2Ref = useRef(null); // Celebration Page
  const page3Ref = useRef(null); // MessageCard
  const page4Ref = useRef(null); // Gallery
  const musicPlayerRef = useRef(null); // Music player control

  const goToPage = (pageNumber) => {
    const refs = { 1: page1Ref, 2: page2Ref, 3: page3Ref, 4: page4Ref };
    const currentPageRef = refs[currentPage];
    const nextPageRef = refs[pageNumber];

    const isForward = pageNumber > currentPage;

    // Animate out current page
    gsap.to(currentPageRef.current, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Prepare next page
    gsap.set(nextPageRef.current, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      visibility: "visible",
    });

    // Animate in next page
    gsap.to(nextPageRef.current, {
      x: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2,
      onComplete: () => {
        setCurrentPage(pageNumber);
        // Reset current page position
        gsap.set(currentPageRef.current, { x: "0%", visibility: "hidden" });

        // Smooth scroll to top
        gsap.to(window, { duration: 0.3, scrollTo: { y: 0 } });
      },
    });
  };

  const handleBirthdayReached = () => {
    setBirthdayReached(true);
    localStorage.setItem("birthdayReached", "true"); // Persist to localStorage
    setShowEffects(true);
    // Stop effects after some time
    setTimeout(() => setShowEffects(false), 10000);
  };

  return (
    <div className="app">
      + <MusicPlayer />
      <Hearts />

      {/* PAGE 1: Countdown Timer */}
      <div
        ref={page1Ref}
        className={`page ${currentPage === 1 ? "active" : ""}`}
        style={{ visibility: currentPage === 1 ? "visible" : "hidden" }}
      >
        <section className="hero">
          <h1 id="heroTitle">
            {birthdayReached ? (
              <>
                Happy Birthday <span className="highlight">[RAYYAN SAIFI]</span> 🎂
              </>
            ) : (
              <>
                Counting down to <span className="highlight">[RAYYAN SAIFI]'s</span>{" "}
                special day 🎂
              </>
            )}
          </h1>
          <p>Happiest birthday to the man who is literally everything to me—my heart, my lungs, my mind, my family. 🫀🫁🧠❤️
Youre not just special to me; you’re the reason I believe in humans again after thousands of heartbreaks, especially from my own family.

Tum hi ho jisne mujhe sambhala jab main bilkul toot chuki thi.
Tum sirf mere partner nahi ho—tum woh insan ho jisse mujhe samajh aaya ki pyaar actually hota kya hai. 🥺🤍

Agar tum nahi hote, honestly, mujhe nahi pata mera kya hota.
Tumse milne ke baad hi mein khud se mili hoon. Tumne meri iss stupid si life mein mjhe bohot kuch sikhaya hai ki mein words me kabhi thank you bol hi nahi sakti.

Thank you for being so real, so kind, and so respectful. 🌍✨
Thank you for choosing me, standing by me, and loving me the way you do.
Im so proud to call you mine. ♾️💗

Happy Birthday. 🎂🕊️
I love you—always BABU. 💕💗</p>
        </section>

        <Countdown
          onBirthdayReached={handleBirthdayReached}
          birthdayReached={birthdayReached}
        />

        <section className="teaser">
          <h2 id="teaserHeading">
            {birthdayReached
              ? "💖 Ready for your surprise! 💖"
              : "✨ A special celebration awaits you at midnight... ✨"}
          </h2>
          <p className="teaser-hint">Something magical is about to unfold 💫</p>
        </section>

        <button
          id="surpriseBtn"
          className="celebrate-btn"
          disabled={!birthdayReached}
          onClick={() => goToPage(2)}
        >
          🎀 Let's Celebrate
        </button>
      </div>

      {/* PAGE 2: Celebration/QNA Page */}
      <div
        ref={page2Ref}
        className={`page ${currentPage === 2 ? "active" : ""}`}
        style={{ visibility: currentPage === 2 ? "visible" : "hidden" }}
      >
        <CelebrationPage
          onComplete={() => goToPage(3)}
          musicPlayerRef={musicPlayerRef}
        />
      </div>

      {/* PAGE 3: Message Card */}
      <div
        ref={page3Ref}
        className={`page ${currentPage === 3 ? "active" : ""}`}
        style={{ visibility: currentPage === 3 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(2)}>
          ← Back
        </button>
        <MessageCard isActive={currentPage === 3} />
        <button className="page-nav-btn" onClick={() => goToPage(4)}>
          📸 View Your Teen Memories
        </button>
      </div>

      {/* PAGE 4: Gallery */}
      <div
        ref={page4Ref}
        className={`page ${currentPage === 4 ? "active" : ""}`}
        style={{ visibility: currentPage === 4 ? "visible" : "hidden" }}
      >
        <button className="back-btn" onClick={() => goToPage(3)}>
          ← Back
        </button>
        <Gallery isActive={currentPage === 4} />
        <section className="final">
          <h2 className="final-message">💖 Forever Yours — [CHHOTU] 💖</h2>
          <p className="final-subtitle">Happiest Birthday to the man who didnt just walk into my life, but slowly became my entire world. 🌍❤️

Baby, you are the most respectful and kind-hearted man I have ever seen. The way you respect everyone around you—especially your family—makes me admire you even more every single day. You are the first man I’ve ever known who values his family so deeply, and that alone makes me incredibly proud of you.

Im so, so proud of the person you are—the respect you give, the love you carry, and the kindness you show to everyone without expecting anything in return. You truly have the purest soul I’ve ever known, the kindest soul in this entire universe. ✨🤍

May Allah bless you with everything your heart desires—and if possible, give you my life too. Ameen. 🤲💖
And yes… marry me soon, alien. 🥹👽❤️

Happiest 20th Birthday To You Banarsi Babu ✨</p>
        </section>
      </div>

      {/* Effects */}
      {showEffects && <Effects />}
    </div>
  );
}

export default App;
