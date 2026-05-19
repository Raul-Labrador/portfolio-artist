document.addEventListener("DOMContentLoaded", () => {
	const menuToggle = document.getElementById("menu-toggle");
	const menuMovil = document.getElementById("menu-movil");
	const iconMenu = document.getElementById("icon-menu");
	const iconClose = document.getElementById("icon-close");
	let menuOpen = false;

	/* Abre el menú móvil */
	menuToggle.addEventListener("click", () => {
		menuOpen = !menuOpen;
		menuMovil.classList.toggle("open", menuOpen);
		iconMenu.classList.toggle("d-none", menuOpen);
		iconClose.classList.toggle("d-none", !menuOpen);
	});

	document.querySelectorAll(".enlace-movil").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});

	/* Cierra el menú móvil */
	function closeMenu() {
		menuOpen = false;
		menuMovil.classList.remove("open");
		iconMenu.classList.remove("d-none");
		iconClose.classList.add("d-none");
	}

	/* Botones del hero*/
	document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const target = document.getElementById(btn.dataset.scrollTo);
			if (target) target.scrollIntoView({ behavior: "smooth" });
		});
	});

	/* Formulario de contacto */
	const formulario = document.querySelector(".formulario");
	if (formulario) {
		formulario.addEventListener("submit", (e) => e.preventDefault());
	}

	/* Enlace activo en navbar al hacer scroll */
	const secciones = ["home", "biography", "albums", "tour", "contact"];
	const enlacesNav = document.querySelectorAll(".enlace-nav");

	window.addEventListener("scroll", () => {
		let actual = "";
		secciones.forEach((id) => {
			const el = document.getElementById(id);
			if (el) {
				const rect = el.getBoundingClientRect();
				if (rect.top <= 200) {
					actual = id;
				}
			}
		});
		enlacesNav.forEach((link) => {
			link.classList.toggle("active", link.dataset.section === actual);
		});
	});

	const selectoresReveal =
		".reveal-left, .reveal-right, .reveal-up, .reveal-scale, .fade-in-up";
	const elementosReveal = document.querySelectorAll(selectoresReveal);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("revealed");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 },
	);

	elementosReveal.forEach((el) => observer.observe(el));

	/* Player de Spotify (canciones y álbumes) */
	const spotifyPlayer = document.getElementById("spotify-player");
	const playerContainer = document.getElementById("spotify-player-container");
	const cerrarPlayer = document.getElementById("close-player");

	function abrirPlayer(rawUrl) {
		if (!rawUrl || rawUrl.includes("ENLACE")) return;

		const match = rawUrl.match(/\/(track|album)\/([a-zA-Z0-9]+)/);

		if (match) {
			const tipo = match[1];
			const id = match[2];
			const embedUrl = `https://open.spotify.com/embed/${tipo}/${id}?utm_source=generator&theme=0`;

			spotifyPlayer.src = embedUrl;
			playerContainer.classList.add("active");
			playerContainer.classList.remove("hidden");
		}
	}

	// Canciones
	document.querySelectorAll(".cancion").forEach((fila) => {
		fila.addEventListener("click", () => {
			abrirPlayer(fila.getAttribute("data-track-url"));
			document
				.querySelectorAll(".cancion")
				.forEach((c) => c.classList.remove("active"));
			fila.classList.add("active");
		});
	});

	// Álbumes
	document.querySelectorAll(".play-album-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			abrirPlayer(btn.getAttribute("data-album-url"));
		});
	});

	// Cerrar player
	if (cerrarPlayer) {
		cerrarPlayer.addEventListener("click", () => {
			playerContainer.classList.remove("active");
			setTimeout(() => {
				playerContainer.classList.add("hidden");
				spotifyPlayer.src = "";
			}, 600);
			document
				.querySelectorAll(".cancion")
				.forEach((c) => c.classList.remove("active"));
		});
	}

	// El hero se revela sin esperar scroll
	document
		.querySelectorAll(".hero .fade-in-up")
		.forEach((el) => el.classList.add("revealed"));

	/* Botón scroll to top */
	const scrollTopBtn = document.getElementById("scroll-top");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 500) {
			scrollTopBtn.classList.add("visible");
		} else {
			scrollTopBtn.classList.remove("visible");
		}
	});

	scrollTopBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
});