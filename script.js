const data = [
    {
        "Entreprise": "Bel France",
        "Associations": "Association ICI - Pass, Oasis d’amour, Pacte 62"
    },
    {
        "Entreprise": "Essity France",
        "Associations": "Agir pour la Santé des Femmes (ADSF)"
    },
    {
        "Entreprise": "S.C Johnson",
        "Associations": "Association Soeur Emmanuelle, La Maison des femmes, Laurette Fugain"
    },
    {
        "Entreprise": "L’Oréal",
        "Associations": "Banlieue Santé, Emmaüs Solidarité, Les apprentis d’Auteuil, Pharma solidaires, Samu Social"
    },
    {
        "Entreprise": "General Mills",
        "Associations": "Caritas, La Cravate solidaire"
    },
    {
        "Entreprise": "Innocent Drinks",
        "Associations": "COP1, Humanity Diaspo"
    },
    {
        "Entreprise": "GB Foods",
        "Associations": "COP1, Revivre"
    },
    {
        "Entreprise": "PepsiCo",
        "Associations": "Donnons leur une chance, Revivre"
    },
    {
        "Entreprise": "Ferrero France",
        "Associations": "L’Armée du salut"
    },
    {
        "Entreprise": "CCEP",
        "Associations": "La Protection Civile, Les apprentis d’Autueil"
    },
    {
        "Entreprise": "Playmobil France",
        "Associations": "Le Rire médecin, Tout le monde chante contre le cancer"
    },
    {
        "Entreprise": "Danone France",
        "Associations": "Programme Malin, SOS Bébé"
    },
    {
        "Entreprise": "Colgate Palmolive",
        "Associations": "Revivre"
    },
    {
        "Entreprise": "Kellogg France",
        "Associations": "Rudy Gobert Academy"
    },
    {
        "Entreprise": "Materne France",
        "Associations": "SPA"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const combinedData = [...data].sort((a, b) => a.Entreprise.localeCompare(b.Entreprise));
    const select = document.getElementById('associationSelect');
    combinedData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.Entreprise;
        option.textContent = item.Entreprise;
        select.appendChild(option);
    });

    document.getElementById('searchInput').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        const filteredData = combinedData.filter(item => 
            item.Entreprise.toLowerCase().includes(query) ||
            item.Associations.toLowerCase().includes(query)
        );
        displayData(filteredData);
    });

    document.getElementById('associationSelect').addEventListener('change', filterByAssociation);
    document.getElementById('resetButton').addEventListener('click', resetFilter);

    function filterByAssociation() {
        const select = document.getElementById('associationSelect');
        const selectedEntreprise = select.value;
        if (selectedEntreprise) {
            const filteredData = combinedData.filter(item => item.Entreprise === selectedEntreprise);
            displayData(filteredData);
        } else {
            resetFilter();
        }
    }

    function resetFilter() {
        displayData(combinedData);
    }

    function normalizeString(str) {
        return str
            .replace(/\s+/g, '-')
            .replace(/[éèêë]/g, 'e')
            .replace(/[àâä]/g, 'a')
            .replace(/[îï]/g, 'i')
            .replace(/[ôö]/g, 'o')
            .replace(/[ùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^\w-]/g, '')
            .toLowerCase();
    }

    function displayData(data) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';  // Effacer le contenu précédent
        data.forEach(item => {
            const logoFileName = normalizeString(item.Entreprise) + '.jpg';
            console.log(`Trying to load image: logos/${logoFileName}`);  // Log pour vérifier les chemins des images
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <div class="logo" style="background-image: url('logos/${logoFileName}');"></div>
                <div class="entreprise">${item.Entreprise}</div>
                <div class="separator"></div>
                <div class="associations-title">Association(s) soutenue(s)</div>
                <div class="associations">${item.Associations}</div>
            `;
            contentDiv.appendChild(div);
        });
    }

    // Afficher toutes les données par défaut
    resetFilter();
});
