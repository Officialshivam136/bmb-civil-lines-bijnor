const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding the complete verified Bikaner Misthan Bhandar Bijnor Menu (All 48+ Items) ---');

  // Categories map
  const categories = await prisma.category.findMany();
  const catMap = {};
  categories.forEach(c => { catMap[c.slug] = c.id; });

  const fullCatalogue = [
    // --- 1. Snacks & Chaat ---
    {
      cat: 'snacks-chaat',
      name: 'Desi Samosa',
      description: 'Golden fried crispy pastry filled with spiced potato and peas, served with sweet saunth and mint chutney.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '1 piece', price: 22 }, { weight: '2 pieces', price: 44 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Samosa Chaat',
      description: 'Crushed hot samosa layered with chhole gravy, sweet yogurt, spicy mint chutney, and sev.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/960px-Dahi_puri%2C_Doi_phuchka.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '1 Plate', price: 60 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Khaman Dhokla',
      description: 'Soft, spongy steamed gram flour cakes tempered with mustard seeds and green chillies.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Dhokla_on_Gujrart.jpg',
      isFeatured: true, isBestSeller: false,
      variants: [{ weight: '250g', price: 85 }, { weight: '500g', price: 170 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Aloo Tikki Chaat',
      description: 'Crisp golden potato patties served with sweet curd, green chutney, and tamarind saunth.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/960px-Aloo_Tikki_served_with_chutneys.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '1 Plate (2 pcs)', price: 70 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Dahi Vada',
      description: 'Soft lentil dumplings soaked in thick sweet curd, sprinkled with roasted cumin.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '1 Plate (2 pcs)', price: 80 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Atta Golgappe',
      description: 'Crispy whole wheat puris with spicy mint water, sweet saunth, and potato-chickpea filling.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/960px-Pani_Puri1.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: 'Pack of 10 pcs', price: 50 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Suji Golgappe',
      description: 'Extra crunchy semolina puris served with chilled hing-zeera pani and sweet chutney.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/960px-Pani_Puri1.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: 'Pack of 10 pcs', price: 60 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Khasta Kachori',
      description: 'Crispy flaky puffed pastry stuffed with spiced urad dal filling and hing aroma.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '2 pieces', price: 50 }, { weight: '4 pieces', price: 100 }]
    },
    {
      cat: 'snacks-chaat',
      name: 'Papdi Mathri',
      description: 'Traditional crisp and flaky salted savory crackers, perfect with evening tea.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g Pack', price: 140 }, { weight: '1kg Pack', price: 280 }]
    },

    // --- 2. Traditional Mithai ---
    {
      cat: 'traditional-mithai',
      name: 'Desi Ghee Jalebi',
      description: 'Freshly fried hot and crispy spirals of jalebi soaked in fragrant saffron sugar syrup.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 81 }, { weight: '500g', price: 160 }, { weight: '1kg', price: 320 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Paneer Jalebi',
      description: 'Soft cottage-cheese spirals fried till deep golden and immersed in thick cardamom syrup.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 140 }, { weight: '500g', price: 280 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Shahi Imarti',
      description: 'Intricately swirled urad dal sweet fried in pure desi ghee and glazed with saffron syrup.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/JalebiIndia.jpg/960px-JalebiIndia.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 110 }, { weight: '500g', price: 220 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Rasbhari',
      description: 'Mini bite-sized juicy cottage cheese sweets dipped in light cardamom syrup. A Bikaner Bijnor specialty.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 110 }, { weight: '500g', price: 220 }, { weight: '1kg', price: 440 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Spongy Bengali Rasgulla',
      description: 'Super soft, airy, and juicy chhena balls soaked in pristine sugar syrup.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 130 }, { weight: '500g', price: 260 }, { weight: '1kg', price: 520 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Kala Jamun',
      description: 'Deep fried rich mawa dumplings with caramelized dark crust and dry fruit stuffing.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 130 }, { weight: '500g', price: 260 }, { weight: '1kg', price: 520 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Gulab Jamun (Desi Ghee)',
      description: 'Melt-in-mouth golden khoya dumplings gently soaked in rose-cardamom sugar syrup.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 125 }, { weight: '500g', price: 250 }, { weight: '1kg', price: 500 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Rajbhog',
      description: 'Royal yellow chhena sweet stuffed with pistachios and infused with Kashmiri saffron.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '2 pcs', price: 80 }, { weight: '500g', price: 280 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Kesari Rasmalai',
      description: 'Delicate cottage cheese patties immersed in chilled clotted saffron cream milk.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/960px-Ras_Malai_2.JPG',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '2 pcs', price: 90 }, { weight: '4 pcs', price: 180 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Angoori Petha',
      description: 'Translucent grape-sized ash gourd candied sweets soaked in sugar syrup.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Petha_kesari.JPG/960px-Petha_kesari.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g', price: 160 }, { weight: '1kg', price: 300 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Lachha Rabri',
      description: 'Slow-simmered whole milk thickened into layers of rich malai clotted cream.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Homemade_Rabri.jpg/960px-Homemade_Rabri.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 140 }, { weight: '500g', price: 280 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Desi Ghee Soan Papdi',
      description: 'Crisp, flaky, and layered traditional sweet made with gram flour and cardamom.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Son_papadi.jpg/960px-Son_papadi.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g Box', price: 180 }, { weight: '1kg Box', price: 350 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Batisa',
      description: 'Rich, melt-in-the-mouth flaky gram flour and desi ghee specialty square sweet.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Son_papadi.jpg/960px-Son_papadi.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g Box', price: 190 }, { weight: '1kg Box', price: 370 }]
    },
    {
      cat: 'traditional-mithai',
      name: 'Chandrakala',
      description: 'Crescent pastry stuffed with sweetened khoya, nuts, and dipped in sugar glaze.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 300 }]
    },

    // --- 3. Kaju & Dry Fruits ---
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Katli (Pure Silver Vark)',
      description: 'Diamond-shaped classic cashew fudge made from select high-grade cashews and real silver leaf.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 280 }, { weight: '500g', price: 550 }, { weight: '1kg', price: 1050 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Mix Sweets',
      description: 'Assorted premium cashew sweets including rolls, diamonds, and dry fruit bites.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g Box', price: 580 }, { weight: '1kg Box', price: 1100 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Fry (Salted)',
      description: 'Jumbo whole cashews gently roasted in pure desi ghee and sprinkled with Himalayan salt.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 320 }, { weight: '500g', price: 620 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Bites',
      description: 'Bite-sized cubes of rich cashews combined with pistachios and roasted almond bits.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 320 }, { weight: '500g', price: 620 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Samosa Sweet',
      description: 'Delicate mini cashew shells stuffed with gulkand and dry fruit masala.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 310 }, { weight: '500g', price: 600 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Anjeer Roll',
      description: 'Rich paste of dried Afghan figs and chopped crunchy nuts rolled into cashew crust.',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 320 }, { weight: '500g', price: 620 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Kaju Paan',
      description: 'Exquisite betel-leaf shaped cashew sweet filled with aromatic gulkand and fennel.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 310 }, { weight: '500g', price: 600 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Dry Fruits Laddu',
      description: 'Sugar-free energy laddu made with chopped dates, cashews, almonds, and pistachios.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 300 }, { weight: '500g', price: 580 }]
    },
    {
      cat: 'kaju-dry-fruits',
      name: 'Aam Papad Sweet',
      description: 'Traditional spiced layered mango pulp confection, sweet and tangy.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 90 }, { weight: '500g', price: 180 }]
    },

    // --- 4. Barfi & Milk Sweets ---
    {
      cat: 'barfi-milk-sweets',
      name: 'Special Milk Cake',
      description: 'Grainy, caramelized milk delicacy prepared by slow cooking full cream dairy milk.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 160 }, { weight: '500g', price: 320 }, { weight: '1kg', price: 640 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Bikaneri Barfi',
      description: 'Classic rich khoya barfi cooked in desi ghee with silver vark and cardamom.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 300 }, { weight: '1kg', price: 600 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Doda Barfi',
      description: 'Traditional dark fudgy sweet made with sprouted wheat, milk, nuts, and pure ghee.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 155 }, { weight: '500g', price: 310 }, { weight: '1kg', price: 620 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Nariyal Barfi',
      description: 'Fine desiccated coconut cooked in sweet reduced milk and cardamom.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 140 }, { weight: '500g', price: 280 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Chocolate Barfi',
      description: 'Dual layer barfi combining rich cocoa fudge with traditional white khoya mawa.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 155 }, { weight: '500g', price: 310 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Kaju Kesar Barfi',
      description: 'Deluxe mawa and cashew squares infused with natural saffron extracts.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 190 }, { weight: '500g', price: 380 }]
    },
    {
      cat: 'barfi-milk-sweets',
      name: 'Special Bikaneri Peda',
      description: 'Creamy semi-soft mawa sweet flavoured with green cardamom and saffron.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg/960px-Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 140 }, { weight: '500g', price: 280 }]
    },

    // --- 5. Laddu ---
    {
      cat: 'laddu',
      name: '5 Star Laddu',
      description: 'Signature rich dry-fruit loaded royal laddu made in pure Bikaner desi ghee.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 430 }, { weight: '500g', price: 850 }, { weight: '1kg', price: 1700 }]
    },
    {
      cat: 'laddu',
      name: 'Motichoor Desi Ghee Laddu',
      description: 'Tiny gram flour pearls fried in pure ghee, simmered in sugar syrup and shaped into aromatic laddus.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 120 }, { weight: '500g', price: 240 }, { weight: '1kg', price: 480 }]
    },
    {
      cat: 'laddu',
      name: 'Besan Laddu (Desi Ghee)',
      description: 'Slow-roasted gram flour with pure ghee, sugar, cardamom, and almond flakes.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 125 }, { weight: '500g', price: 250 }, { weight: '1kg', price: 500 }]
    },
    {
      cat: 'laddu',
      name: 'Atta Laddu',
      description: 'Whole wheat flour roasted in desi ghee with gond and crunchy chopped nuts.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 130 }, { weight: '500g', price: 260 }]
    },
    {
      cat: 'laddu',
      name: 'Navratan Laddu',
      description: 'Festive laddu packed with nine distinct dry fruits, seeds, and aromatic spices.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '250g', price: 220 }, { weight: '500g', price: 430 }]
    },

    // --- 6. Special Items ---
    {
      cat: 'special-items',
      name: 'Malai Chap',
      description: 'Tender chenna patties layered with fresh malai cream and saffron glaze. High demand in Bijnor.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/960px-Ras_Malai_2.JPG',
      isFeatured: true, isBestSeller: true,
      variants: [{ weight: '250g', price: 175 }, { weight: '500g', price: 350 }, { weight: '1kg', price: 700 }]
    },
    {
      cat: 'special-items',
      name: 'Malai Roll',
      description: 'Thin delicate chhena sheet rolled around rich dry fruit mawa and dipped in condensed milk.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/960px-Ras_Malai_2.JPG',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '250g', price: 180 }, { weight: '500g', price: 360 }]
    },
    {
      cat: 'special-items',
      name: 'Chhappan Bhog Royal Mix Gift Box',
      description: 'Curated royal celebration gift box packed with Kaju Katli, Milk Cake, Dry Fruit Laddu, and Peda.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG',
      isFeatured: true, isBestSeller: false,
      variants: [{ weight: '500g Box', price: 420 }, { weight: '1kg Royal Box', price: 820 }]
    },
    {
      cat: 'special-items',
      name: 'Celebration Mix Box',
      description: 'Handpicked selection of daily favourites: Gulab Jamun, Rasgulla, and Besan Laddu.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g Box', price: 260 }, { weight: '1kg Box', price: 500 }]
    },

    // --- 7. Cakes & Bakery ---
    {
      cat: 'cakes',
      name: 'Fresh Pineapple Cake (Eggless)',
      description: '100% vegetarian sponge cake loaded with whipped vanilla cream and juicy pineapple chunks.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      isFeatured: false, isBestSeller: true,
      variants: [{ weight: '500g (Eggless)', price: 350 }, { weight: '1kg (Eggless)', price: 650 }]
    },
    {
      cat: 'cakes',
      name: 'Black Forest Celebration Cake',
      description: 'Rich chocolate sponge layered with whipped fresh cream, cherries, and dark chocolate flakes.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Black_Forest_gateau.jpg/960px-Black_Forest_gateau.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g (Eggless)', price: 380 }, { weight: '1kg (Eggless)', price: 720 }]
    },
    {
      cat: 'cakes',
      name: 'Light Chocolate Cake',
      description: 'Velvety milk chocolate cream frosted on fluffy cocoa sponge, 100% eggless.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Black_Forest_gateau.jpg/960px-Black_Forest_gateau.jpg',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g (Eggless)', price: 370 }, { weight: '1kg (Eggless)', price: 700 }]
    },
    {
      cat: 'cakes',
      name: 'Butterscotch Crunch Cake',
      description: 'Vanilla cream cake infused with caramel praline sauce and crunchy butterscotch nuts.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      isFeatured: false, isBestSeller: false,
      variants: [{ weight: '500g (Eggless)', price: 360 }, { weight: '1kg (Eggless)', price: 680 }]
    }
  ];

  // Insert or update all items
  for (const item of fullCatalogue) {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check if product exists
    let existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      existing = await prisma.product.create({
        data: {
          name: item.name,
          slug,
          description: item.description,
          categoryId: catMap[item.cat],
          isFeatured: item.isFeatured,
          isBestSeller: item.isBestSeller,
          isVegetarian: true,
          isActive: true,
          priceConfigured: true
        }
      });
    } else {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          description: item.description,
          categoryId: catMap[item.cat],
          isFeatured: item.isFeatured,
          isBestSeller: item.isBestSeller
        }
      });
    }

    // Set correct Image
    await prisma.productImage.deleteMany({ where: { productId: existing.id } });
    await prisma.productImage.create({
      data: {
        productId: existing.id,
        url: item.image,
        altText: item.name,
        sortOrder: 0
      }
    });

    // Set Variants
    await prisma.productVariant.deleteMany({ where: { productId: existing.id } });
    for (const v of item.variants) {
      await prisma.productVariant.create({
        data: {
          productId: existing.id,
          weight: v.weight,
          price: v.price,
          stock: 50,
          isActive: true
        }
      });
    }
    console.log(`✓ Synchronized product: ${item.name}`);
  }

  const total = await prisma.product.count();
  console.log(`\nAll items synchronized! Total products in database: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
