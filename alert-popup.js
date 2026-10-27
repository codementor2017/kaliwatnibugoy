// welcome-popup.js
// Include in index.html with: <script src="welcome-popup.js"></script>
// Shows a beautiful welcome popup once the page has fully loaded.

window.addEventListener('load', function () {
    'use strict';

    // ---------- Inject styles ----------
    const style = document.createElement('style');
    style.textContent = `
        #wp-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(15, 20, 40, 0.6);
            backdrop-filter: blur(6px);
            animation: wp-fade-in 0.4s ease;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }

        #wp-modal {
            position: relative;
            max-width: 480px;
            width: 100%;
            background: #ffffff;
            border-radius: 22px;
            padding: 40px 34px 34px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
            text-align: center;
            color: #2b2b3c;
            line-height: 1.65;
            animation: wp-pop-in 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        #wp-modal::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 8px;
            border-radius: 22px 22px 0 0;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        }

        #wp-modal .wp-emoji {
            font-size: 52px;
            display: block;
            margin-bottom: 14px;
            animation: wp-bounce 1.8s ease-in-out infinite;
        }

        #wp-modal h2 {
            margin: 0 0 16px;
            font-size: 24px;
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        #wp-modal p.wp-text {
            margin: 0 0 16px;
            font-size: 16px;
            color: #444;
        }

        #wp-modal .wp-contact {
            display: inline-block;
            margin: 6px 0 22px;
            padding: 12px 18px;
            background: #f3f0ff;
            border: 1px solid #e0d9ff;
            border-radius: 12px;
            font-size: 15px;
        }

        #wp-modal .wp-contact a {
            color: #2575fc;
            font-weight: 600;
            text-decoration: none;
            word-break: break-all;
        }

        #wp-modal .wp-contact a:hover {
            text-decoration: underline;
        }

        #wp-close-btn {
            padding: 13px 34px;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            color: #fff;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(37, 117, 252, 0.4);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        #wp-close-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 28px rgba(37, 117, 252, 0.55);
        }
        #wp-close-btn:active {
            transform: translateY(0) scale(0.98);
        }

        @keyframes wp-fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        @keyframes wp-pop-in {
            from { opacity: 0; transform: scale(0.85) translateY(25px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wp-bounce {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-8px); }
        }
    `;
    document.head.appendChild(style);

    // ---------- Build popup ----------
    const overlay = document.createElement('div');
    overlay.id = 'wp-overlay';

    const modal = document.createElement('div');
    modal.id = 'wp-modal';

    modal.innerHTML = `
        <span class="wp-emoji">🌳</span>
        <h2>Welcome to Our Family Tree</h2>
        <p class="wp-text">
            I'm creating this family tree so that we can get to know each other
            and learn about our relatives.
        </p>
        <p class="wp-text">Have any questions or suggestions? Feel free to reach out:</p>
        <div class="wp-contact">
            ✉️ <a href="mailto:onatlou1015@gmail.com">onatlou1015@gmail.com</a>
        </div>
        <br>
        <button id="wp-close-btn">Let's Explore 🌿</button>
    `;

    overlay.appendChild(modal);

    // ---------- Close logic ----------
    function closePopup() {
        overlay.style.animation = 'wp-fade-in 0.25s ease reverse forwards';
        modal.style.animation = 'wp-pop-in 0.25s ease reverse forwards';
        setTimeout(function () {
            overlay.remove();
            document.body.style.overflow = '';
        }, 250);
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    modal.querySelector('#wp-close-btn').addEventListener('click', closePopup);

    // Close when clicking outside the modal
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePopup();
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.contains(overlay)) {
            closePopup();
        }
    });
});