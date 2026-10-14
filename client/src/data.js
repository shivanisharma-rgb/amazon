const starterProducts = [
  { id: 'p1', name: 'Everyday Ceramic Pour-Over Set', category: 'Home & Living', price: 34.5, oldPrice: 48, rating: 4.8, reviews: 284, badge: 'BESTSELLER', color: '#e9ded0', image: 'photo-1517668808822-9ebb02f2a0e6', description: 'A slow morning starts here. This thoughtfully designed ceramic dripper and carafe bring a little ritual to your daily coffee.' },
  { id: 'p2', name: 'Studio Wireless Headphones', category: 'Electronics', price: 89, oldPrice: 119, rating: 4.7, reviews: 632, badge: '−25%', color: '#dce2e6', image: 'photo-1505740420928-5e560c06d30e', description: 'Rich, balanced sound meets all-day comfort. Enjoy up to 32 hours of listening and intuitive controls.' },
  { id: 'p3', name: 'The Weekend Carryall', category: 'Accessories', price: 58, oldPrice: null, rating: 4.9, reviews: 173, badge: 'NEW', color: '#d9d5c7', image: 'photo-1553062407-98eeb64c6a62', description: 'A versatile, hard-wearing bag for the in-between days. Made with recycled canvas and plenty of pockets.' },
  { id: 'p4', name: 'Soft Knit Lounge Throw', category: 'Home & Living', price: 42, oldPrice: 56, rating: 4.6, reviews: 91, badge: '−25%', color: '#e4ded6', image: 'photo-1600369671236-e74521d4b6ad', description: 'A soft, breathable knit that makes any corner feel like your favorite spot. Woven from responsibly sourced cotton.' },
  { id: 'p5', name: 'Minimalist Desk Lamp', category: 'Home & Living', price: 64, oldPrice: null, rating: 4.8, reviews: 208, badge: '', color: '#e4e7df', image: 'photo-1507473885765-e6ed057f782c', description: 'Warm, focused light for work and winding down. A compact aluminum design with three dimmable settings.' },
  { id: 'p6', name: 'Daily Ritual Skincare Trio', category: 'Wellness', price: 38, oldPrice: 45, rating: 4.5, reviews: 427, badge: 'POPULAR', color: '#e9dcd3', image: 'photo-1608248543803-ba4f8c70ae0b', description: 'Three gentle essentials for a simple, feel-good routine. Vegan, fragrance-free, and made for everyday.' },
  { id: 'p7', name: 'Classic Everyday Sneakers', category: 'Accessories', price: 76, oldPrice: null, rating: 4.7, reviews: 315, badge: '', color: '#e8e8e6', image: 'photo-1542291026-7eec264c27ff', description: 'Light on your feet, easy on everything else. A clean everyday silhouette with cushioned recycled-fiber lining.' },
  { id: 'p8', name: 'Pocket-size Bluetooth Speaker', category: 'Electronics', price: 49, oldPrice: 65, rating: 4.6, reviews: 156, badge: '−25%', color: '#d8e2e2', image: 'photo-1608043152269-423dbba4e7e1', description: 'Small speaker, surprisingly spacious sound. Splash resistant and ready to take wherever the day goes.' },
]

const moreProducts = [
  { name: 'Linen Cushion Cover Set', category: 'Home & Living', price: 29, oldPrice: 38, badge: '−24%', image: 'photo-1584100936595-c0654b55a2e2', description: 'Washed linen cushion covers in a relaxed, easy-care weave. Set of two, made for the sofa or your favorite chair.' },
  { name: 'Hand-thrown Breakfast Bowl', category: 'Home & Living', price: 22, image: 'photo-1578749556568-bc2c40e68b61', description: 'A satisfyingly sturdy stoneware bowl with a softly speckled glaze. Each piece has its own little character.' },
  { name: 'Amber Glass Table Vase', category: 'Home & Living', price: 31, image: 'photo-1578500494198-246f612d3b3d', description: 'A sculptural amber glass vase that looks lovely with fresh stems or simply catching the light on a shelf.' },
  { name: 'Sunday Morning Candle', category: 'Home & Living', price: 24, oldPrice: 30, badge: '−20%', image: 'photo-1603006905003-be475563bc59', description: 'A gentle blend of cedar, citrus, and warm tea in a reusable glass jar. Hand-poured soy wax, 45-hour burn.' },
  { name: 'Everyday Cotton Bath Towels', category: 'Home & Living', price: 46, image: 'photo-1620626011761-996317b8d101', description: 'A pair of plush, absorbent cotton towels that get softer with every wash. Made for everyday comfort.' },
  { name: 'Woven Market Basket', category: 'Home & Living', price: 39, image: 'photo-1590874103328-eac38a683ce7', description: 'A roomy handwoven basket for market mornings, sunny picnics, and all the little things you carry.' },
  { name: 'Stoneware Dinner Plate Set', category: 'Home & Living', price: 54, oldPrice: 68, badge: '−20%', image: 'photo-1603199506016-b9a594b593c0', description: 'Four everyday plates in durable, softly glazed stoneware. A simple setting that makes any meal feel special.' },
  { name: 'Scented Reed Diffuser', category: 'Home & Living', price: 28, image: 'photo-1608571423902-eed4a5ad8108', description: 'A subtle botanical fragrance that welcomes you home. Includes a reusable glass vessel and natural reeds.' },
  { name: 'Compact Mechanical Keyboard', category: 'Electronics', price: 79, oldPrice: 99, badge: '−20%', image: 'photo-1587829741301-dc798b83add3', description: 'Tactile keys, a satisfying sound, and a compact layout that frees up desk space. Plug-and-play USB-C.' },
  { name: 'Foldable Wireless Earbuds', category: 'Electronics', price: 59, image: 'photo-1606220945770-b5b6c2c55bf1', description: 'Clear calls and well-balanced sound in a pocket-friendly case. Three ear tip sizes help find your fit.' },
  { name: 'Portable Reading Light', category: 'Electronics', price: 27, image: 'photo-1507473885765-e6ed057f782c', description: 'A rechargeable clip-on reading light with three warm brightness settings. A little reading nook, anywhere.' },
  { name: 'Insulated Travel Tumbler', category: 'Electronics', price: 32, oldPrice: 40, badge: '−20%', image: 'photo-1602143407151-7111542de6e8', description: 'A leak-resistant stainless tumbler that keeps drinks cold or warm while you get on with your day.' },
  { name: 'Instant Film Pocket Camera', category: 'Electronics', price: 96, image: 'photo-1516035069371-29a1b244cc32', description: 'A joyful point-and-shoot instant camera with automatic exposure and a built-in selfie mirror.' },
  { name: 'USB-C Charging Station', category: 'Electronics', price: 44, image: 'photo-1583863788434-e58a36330cf0', description: 'One tidy charging hub for your everyday devices. Compact, reliable, and ready for a nightstand or desk.' },
  { name: 'Bluetooth Over-Ear Headset', category: 'Electronics', price: 72, oldPrice: 90, badge: '−20%', image: 'photo-1546435770-a3e426bf472b', description: 'Comfortable over-ear listening with a fold-flat design, simple controls, and a long-lasting battery.' },
  { name: 'Smart Home Table Clock', category: 'Electronics', price: 52, image: 'photo-1508057198894-247b23fe5ade', description: 'A clean-lined bedside clock with a dimmable display, gentle alarm, and USB charging port.' },
  { name: 'Everyday Leather Card Case', category: 'Accessories', price: 35, image: 'photo-1627123424574-724758594e93', description: 'A slim, responsibly sourced leather card case with four card slots and a handy center pocket.' },
  { name: 'Soft Weekend Baseball Cap', category: 'Accessories', price: 26, image: 'photo-1588850561407-ed78c282e89b', description: 'An easy cotton twill cap with an adjustable back strap and a just-right broken-in feel.' },
  { name: 'Minimal Gold Hoop Earrings', category: 'Accessories', price: 42, oldPrice: 52, badge: '−19%', image: 'photo-1535632066927-ab7c9ab60908', description: 'Lightweight, polished hoops for the everyday. Nickel-free, with a secure click closure.' },
  { name: 'Canvas Everyday Backpack', category: 'Accessories', price: 68, image: 'photo-1553062407-98eeb64c6a62', description: 'A practical canvas backpack with padded straps, a laptop sleeve, and a water bottle pocket.' },
  { name: 'Classic Polarized Sunglasses', category: 'Accessories', price: 48, image: 'photo-1511499767150-a48a237f0083', description: 'Timeless frames with polarized lenses and full UV protection. Includes a soft travel pouch.' },
  { name: 'Travel Jewelry Organizer', category: 'Accessories', price: 33, image: 'photo-1617038220319-276d3cfab638', description: 'Keep the little things untangled on every trip with a compact organizer for rings, necklaces, and earrings.' },
  { name: 'Lightweight Everyday Scarf', category: 'Accessories', price: 37, oldPrice: 45, badge: '−18%', image: 'photo-1601924994987-69e26d50dc26', description: 'A soft, airy scarf in breathable cotton that works as an easy layer in every season.' },
  { name: 'Weekender Toiletry Pouch', category: 'Accessories', price: 29, image: 'photo-1553531384-411a247ccd73', description: 'A wipe-clean lined pouch with a wide opening and useful inside pockets. Ready for a weekend away.' },
  { name: 'Calm Evening Herbal Tea Set', category: 'Wellness', price: 25, image: 'photo-1544787219-7f47ccb76574', description: 'A comforting selection of caffeine-free herbal blends for slowing down at the end of the day.' },
  { name: 'Daily Hydration Bottle', category: 'Wellness', price: 28, oldPrice: 35, badge: '−20%', image: 'photo-1602143407151-7111542de6e8', description: 'A reusable, easy-carry water bottle with a leakproof lid and a wide opening for easy cleaning.' },
  { name: 'Gentle Cleansing Balm', category: 'Wellness', price: 21, image: 'photo-1608248543803-ba4f8c70ae0b', description: 'A gentle, fragrance-free cleansing balm that melts away the day without leaving skin feeling dry.' },
  { name: 'Stretch & Restore Yoga Mat', category: 'Wellness', price: 55, image: 'photo-1592432678016-e910b452f9a2', description: 'A supportive, grippy yoga mat with a comfortable cushioned feel and an easy-carry strap.' },
  { name: 'Lavender Sleep Mist', category: 'Wellness', price: 19, image: 'photo-1608571423902-eed4a5ad8108', description: 'A soft lavender and chamomile pillow mist for a relaxing bedtime routine. Made with gentle ingredients.' },
  { name: 'Daily Mineral Sunscreen SPF 30', category: 'Wellness', price: 24, image: 'photo-1556229010-6c3f2c9ca5f8', description: 'A lightweight, non-greasy mineral sunscreen for daily face and body protection. Unscented and easy to layer.' },
  { name: 'Relaxed Fit Organic Tee', category: 'Accessories', price: 32, image: 'photo-1521572163474-6864f9cf17ab', description: 'A soft, easy-fitting everyday tee made from organic cotton. A dependable favorite for layering or wearing solo.' },
  { name: 'Reusable Produce Bag Set', category: 'Home & Living', price: 18, image: 'photo-1542838132-92c53300491e', description: 'A set of five washable mesh produce bags to make market trips a little lighter on single-use plastic.' },
]

export const products = [
  ...starterProducts,
  ...moreProducts.map((product, index) => ({
    id: `p${index + 9}`,
    rating: [4.4, 4.5, 4.6, 4.7, 4.8, 4.9][index % 6],
    reviews: 32 + (index * 47) % 420,
    color: ['#e9ded0', '#dce2e6', '#d9d5c7', '#e4ded6', '#e4e7df', '#e9dcd3', '#e8e8e6', '#d8e2e2'][index % 8],
    ...product,
  })),
]

export const categories = [
  { name: 'Home & Living', title: 'Make room for cozy', image: 'photo-1616486338812-3dadae4b4ace' },
  { name: 'Electronics', title: 'Everyday, upgraded', image: 'photo-1498049794561-7780e7231661' },
  { name: 'Accessories', title: 'Out the door, in style', image: 'photo-1441986300917-64674bd600d8' },
  { name: 'Wellness', title: 'A little time for you', image: 'photo-1540555700478-4be289fbecef' },
]
