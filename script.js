document.body.style.backgroundColor ="yellow";
// ===============================
// NAVIGATION DU MENU
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const liensMenu = document.querySelectorAll("nav a");

    liensMenu.forEach(function (lien) {

        lien.addEventListener("click", function (event) {

            const texte = lien.textContent.trim().toLowerCase();

            // Panier
            if (lien.id === "panier") {
                return;
            }

            // Chaussures
            if (texte.includes("chaussures")) {

                event.preventDefault();

                const section = document.getElementById("chaussures");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                return;
            }

            // Montres
            if (texte.includes("montres")) {

                event.preventDefault();

                const section = document.getElementById("montres");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                return;
            }

            // Autres articles
            if (texte.includes("autres")) {

                event.preventDefault();

                const section = document.getElementById("autres");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                return;
            }

            // Contact
            if (texte.includes("contact")) {

                event.preventDefault();

                const section = document.getElementById("contact");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                return;
            }

        });

    });

});


// ===============================
// PANIER MIDOKPE SHOP
// ===============================

// Récupérer le panier sauvegardé
let panier = JSON.parse(localStorage.getItem("panier")) || [];


// Donner la quantité 1 aux anciens produits
// qui n'avaient pas encore de quantité
panier = panier.map(function (produit) {

    return {
        nom: produit.nom,
        prix: produit.prix,
        quantite: produit.quantite || 1
    };

});


// Sauvegarder le panier corrigé
localStorage.setItem("panier", JSON.stringify(panier));


// ===============================
// COMPTEUR DU PANIER
// ===============================

const compteur = document.getElementById("compteur");

function mettreAJourCompteur() {

    if (compteur) {

        let nombreProduits = panier.reduce(function (total, produit) {

            return total + produit.quantite;

        }, 0);

        compteur.textContent = nombreProduits;
    }
}

mettreAJourCompteur();


// ===============================
// AJOUTER UN PRODUIT AU PANIER
// ===============================

const boutons = document.querySelectorAll(".ajouter-panier");

boutons.forEach(function (bouton) {

    bouton.addEventListener("click", function () {

        const nom = bouton.dataset.nom;
        const prix = Number(bouton.dataset.prix);

        // Chercher si le produit existe déjà
        const produitExistant = panier.find(function (produit) {

            return produit.nom === nom;

        });


        if (produitExistant) {

            // Le produit existe déjà
            produitExistant.quantite += 1;

        } else {

            // Nouveau produit
            panier.push({

                nom: nom,
                prix: prix,
                quantite: 1

            });

        }


        // Sauvegarder
        localStorage.setItem(
            "panier",
            JSON.stringify(panier)
        );


        // Mettre à jour le compteur
        mettreAJourCompteur();


        console.log("Produit ajouté :", nom);
        console.log("Panier :", panier);


        alert("Produit ajouté au panier 🛒");

    });

});


// ===============================
// AFFICHER LE PANIER
// ===============================

const listePanier = document.getElementById("liste-panier");
const totalPanier = document.getElementById("total-panier");


function afficherPanier() {

    if (!listePanier) {
        return;
    }


    listePanier.innerHTML = "";


    let total = 0;


    panier.forEach(function (produit) {

        const article = document.createElement("div");


        const sousTotal =
            produit.prix * produit.quantite;


        article.innerHTML = `

            <h3>${produit.nom}</h3>

            <p>Prix : ${produit.prix} FCFA</p>

            <button class="moins">➖</button>

            <span class="quantite">
                ${produit.quantite}
            </span>

            <button class="plus">➕</button>

            <p>
                Sous-total : ${sousTotal} FCFA
            </p>

            <button class="supprimer">
                🗑️ Supprimer
            </button>

            <hr>

        `;


        // ===============================
        // BOUTON MOINS
        // ===============================

        const boutonMoins =
            article.querySelector(".moins");


        boutonMoins.addEventListener("click", function () {

            if (produit.quantite > 1) {

                produit.quantite -= 1;


                localStorage.setItem(
                    "panier",
                    JSON.stringify(panier)
                );


                afficherPanier();
                mettreAJourCompteur();

            }

        });


        // ===============================
        // BOUTON PLUS
        // ===============================

        const boutonPlus =
            article.querySelector(".plus");


        boutonPlus.addEventListener("click", function () {

            produit.quantite += 1;


            localStorage.setItem(
                "panier",
                JSON.stringify(panier)
            );


            afficherPanier();
            mettreAJourCompteur();

        });


        // ===============================
        // SUPPRIMER
        // ===============================

        const boutonSupprimer =
            article.querySelector(".supprimer");


        boutonSupprimer.addEventListener("click", function () {

            panier = panier.filter(function (item) {

                return item !== produit;

            });


            localStorage.setItem(
                "panier",
                JSON.stringify(panier)
            );


            afficherPanier();
            mettreAJourCompteur();

        });


        listePanier.appendChild(article);


        total = total + sousTotal;

    });


    if (totalPanier) {

        totalPanier.textContent =
            "Total : " + total + " FCFA";

    }

}


afficherPanier();


// ===============================
// COMMANDER SUR WHATSAPP
// ===============================

const boutonWhatsApp =
    document.getElementById("commander-whatsapp");


if (boutonWhatsApp) {

    boutonWhatsApp.addEventListener("click", function () {

        if (panier.length === 0) {

            alert("Votre panier est vide.");

            return;
        }


        let message =
            "Bonjour MIDOKPE SHOP 👋\n\n";


        message +=
            "Je souhaite commander :\n\n";


        panier.forEach(function (produit) {

            const sousTotal =
                produit.prix * produit.quantite;


            message +=
                "- " +
                produit.nom +
                " | Quantité : " +
                produit.quantite +
                " | Sous-total : " +
                sousTotal +
                " FCFA\n";

        });


        let total = panier.reduce(
            function (somme, produit) {

                return somme +
                    (produit.prix * produit.quantite);

            },
            0
        );


        message +=
            "\nTotal : " +
            total +
            " FCFA";


        // Ton numéro WhatsApp
        const numero = "22953510458";


        const lien =
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(message);


        window.open(lien, "_blank");

    });

}