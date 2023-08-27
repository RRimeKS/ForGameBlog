const Blog = require("../models/blog");
const Category = require("../models/category");
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require('bcrypt');
const sequelize = require("./db");

async function populate() {
    const categoryCount = await Category.count();
    if (categoryCount == 0) {
        //user-data
        const users = User.bulkCreate([
            { fullname: "Mehmet Taşkin", email: "info@mehmettaskin.com", password: await bcrypt.hash("asd", 10) },
            { fullname: "Mert Taşkin", email: "info@mertaskin.com", password: await bcrypt.hash("asd", 10) },
            { fullname: "Murat Taşkin", email: "info@murattaskin.com", password: await bcrypt.hash("asd", 10) },
        ]);
        //Blog-data
        const blogs = await Blog.bulkCreate([
            {
                title: "GTA Online’a 2022 Cadılar Bayramı Modu Geldi",
                subtitle: "Rockstar Games tarafından piyasaya sürülen Grand Theft Auto (GTA) Online’a cadılar bayramı modu geldi. 6 Ekim 2022 günü başlayan cadılar bayramı modu 1 Kasım 2022 tarihine kadar devam edecek.",
                desc: "GTA oyunu yediden yetmişe herkesin oynadığı bir oyundu. Özellikle yüksek grafik deneyimi ve çeşitli hikayeler ile oyuncuların daha çok ilgisini çeken GTA 5 çıktığı günden beri oyunu oynayan kişilerin sayısı yüz milyonlar ile ifade edilmeye başlandı. GTA Online’a çeşitli zamanlarda cadılar bayramı modu geliyordu. 2022 yılında da beklenildiği gibi cadılar bayramı modu aktif hale geldi ve çeşitli değişiklikler meydana geldi. GTA’da gelecek hafta çok daha fazla Cadılar Bayramı temalı öğe poyuna entegre edilecek.",
                image: "gta.jpg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 1
            },
            {
                title: "Ubisoft'u Beklenen Çağ Ötesi Oyunu Sonunda Duyuruldu",
                subtitle: "Ubisoft, hayatta kalma-yağmalama oyun konseptini mobil sürüme taşıyacak yeni oyun geliştiriyor. Yeni mobil oyun, Division’un altyapısını kullanacak. Ancak, yeni bir oyun olacak.",
                desc: "Ubisoft şirketi Ton Clancy’s The Division Resurgence oyununu resmen duyurdu. Günümüzün popüler hayatta kalma-yağmalama oyun konseptinin mobil uyarlaması olacak. Division Resurgence, akıllı telefonlarda oynayabilmek için sıfırdan tekrar geliştirilecek. Özellikle mobil oyunculara karşı beklentilerin yüksek olması, şirketin bu oyunun sadece mobil versiyonuna yüzbinlerce dolar para harcamasına neden oldu. Tabii bu aşamada oyunun efsane olduğunu düşünürsek, bu gayet normal bir durum.",
                image: "blog2.jpg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 1
            },
            {
                title: "Lost Ark, Eş Zamanlı Oyuncu Sayısında En Çok Oynanan İkinci Oyun Oldu",
                subtitle: "Lost Ark, çıktığı ilk dakikadan itibaren listeleri altüst etmiş durumda. Steam platformunda eş zamanlı oyuncu sayısında Steam tarihinin en çok oynanan ikinci oyunu olmayı başardı.",
                desc: "deneme",
                image: "blog3.jpg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 1
            },
            {
                title: "The Joker, Mortal Kombat 11’de Fırtına Koparacak!",
                subtitle: "Herkese merhabalar. Geçtiğimiz yılın mart ayında piyasaya sürülen ve serinin en yeni oyunu olan Mortal Kombat 11 için yeni bir Kombat Pack’ in yolda olduğu daha önce duyurulmuştu. Şimdi ise The Joker karakteri bir video ile duyuruldu. Videoda Joker’in bazı hareketlerini ve fatality hareketini görebiliyoruz. Haberimizin detaylarına geçelim.",
                desc: "<h4>Mortal Kombat tarihinde ilk defa <strong>The Joker</strong> olarak oynayabileceğiz.</h4><p>DC evreninden çok iyi tanıdığımız Joker ile oynamak epey farklı olacak gibi görünüyor. Videoyu izlemek bana gerçekten keyif verdi. Arkada öyle bir müzik çalıyor ki önünüze geleni dövme isteği uyandırıyor, vahşeti çağırıyor. Video boyunca <strong>Joker’in</strong> yaptığı komboları ve fatality hareketini görüyoruz. Komboların yaratıcı olduğunu söyleyebiliriz. Fatality kısmı ise gerçekten kanlı bir sahne. DC evreninde gördüğümüz “şakacı” Joker yine bildiğimiz gibi. Yaptığı Fatality’nin en sonunda silahından yukarıda gördüğünüz bayrağı çıkartıyor, rakibiyle resmen alay ediyor. The Joker’ın duyurulduğu videoyu hemen aşağıda bulabilirsiniz. Videoda görünenler bu kadar olsa da <strong>The Joker’a</strong> heyecanlanmamız için yeterli!</p><h4><strong>Kombat Pack’te&nbsp; bulunan tüm karakterler ise şu şekilde;</strong></h4><p><strong>Shang Tsung –&nbsp;</strong>Erişimde</p><p><strong>Nightwolf –&nbsp;</strong>Erişimde</p><p><strong>Terminatör T-800 –</strong> Erişimde</p><p><strong>Sindel – </strong>Erişimde</p><p><strong>Joker –</strong> Duyuruldu</p><p><strong>Spawn –&nbsp;</strong>17 Mart</p>",
                image: "joker.jpeg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 1
            },
            {
                title: "Doom Eternal İçin Yaş Sınırı Ve Fiyat Belli Oldu!",
                subtitle: "22 Kasım 2019’da piyasaya çıkacak ve başta serinin hayranları olmak üzere oyuncuları sevindirecek olan Doom Eternal nihayet yaş derecelendirmesini aldı. Detaylar haberimizde. Bildiğiniz gibi 1992 tarihinde Mortal Kombat ilk çıktığı zaman içerdiği kan ve vahşetten dolayı aileler tarafından büyük bir tepki toplamıştı. Haliyle artık oyunlar çıkmadan önce belirli bir yaş sınırı konulacaktı. 1992’den 2019’a kadar süren bu gelenek hâlâ devam ediyor tabi. Doom Eternal da bu oyunlar arasında.",
                desc:"<p><strong>Doom</strong> serisi de bildiğiniz gibi en az<strong> Mortal Kombat</strong> serisi kadar kan ve vahşetiyle ön plana çıkıyor. Oyun <strong>ESRB</strong> tarafından<strong> “Mature”</strong> yani <strong>“Yetişkin”</strong> seviyesi olarak karar verdi. <strong>Doom</strong>’dan da beklenen bu zaten.</p><p><strong>Doom Eternal</strong> az önce de belirttiğimiz gibi <strong>22 Kasım 2019</strong>’da <strong>Pc</strong>,<strong> Playstation 4</strong>,<strong> Xbox One</strong>, <strong>Nintendo Switch</strong> ve <strong>Google Stadia</strong> için çıkışını yapacak. <strong>PC</strong> için<strong> 349 TL</strong> (Deluxe Edition 449 TL) , <strong>Playstation 4</strong> için<strong> 469 TL</strong> (Deluxe Edition 569 TL) , <strong>Xbox One</strong> için <strong>470 TL</strong> (Deluxe Edition 570 TL) , <strong>Nintendo Switch</strong> için ise <strong>60 Dolar</strong> şeklinde olacak.</p>",
                image: "doom.jpg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 1
            },
            {
                title: "Cyberpunk 2077 ile ilgili Yeni Detaylar Gelmeye Devam Ediyor!",
                subtitle: "E3 2019’da CDPR’ın yaptığı sunumun ardından, insanların Cyberpunk 2077 ile ilgili en çok merak ettiği şeylerden birisi Keanu Reeves’le romantik bir ilişkinin mümkün olup olmadığıydı. Gelen son haberlerle birlikte bu durum da kesinlik kazandı.",
                desc: "<p>CDPR E3 2019’da yaptığı başarılı sunumuyla dikkatleri üzerine çekmiş, insanlarda büyük bir merak uyandırmıştı. Ayrıca sunuma Keanu Reeves’i getirmeleri ve ona oyunda yer vermeleri, insanlarda önü alınamaz bir beklentinin oluşmasına sebep olmuştu. Aradan geçen zamanda yeni detaylar ortaya çıksa da, oyuncuların merak ettiği bir kaç özel konu daha vardı. Bunlardan birisi de oyunda Keanu’yla romantik bir ilişkinin mümkün olup olmadığıydı. Bununla ilgili yeni bir açıklamaysa Cyberpunk 2077 tasarımcılarından birisi olan Max Pears’dan geldi. Pears’a göre oyunda Keanu’yla romantizm yaşamak pek de mümkün olmayacak.</p>",
                image: "cyberpunk.jpg",
                isHomepage: 1,
                isConfirm: 1,
                isShowcase: 1,
                userId: 2
            }
        ]);
        //category-data
        const categories = await Category.bulkCreate([
            { categoryName: "RPG" },
            { categoryName: "FPS" },
            { categoryName: "RP" },
        ]);        
        //role-data
        const roles = await Role.bulkCreate([
            { name: "Admin" },
            { name: "Moderator" },
            { name: "Guest" }
        ]);

        //role of user
        await sequelize.query(`insert into userRoles (roleId, userId) values (${1}, ${1})`);
        await sequelize.query(`insert into userRoles (roleId, userId) values (${2}, ${2})`);
        await sequelize.query(`insert into userRoles (roleId, userId) values (${3}, ${3})`);

        //category added blog
        await blogs[0].addCategory(categories[0]);
        await blogs[1].addCategory(categories[2]);
        await blogs[2].addCategory(categories[2]);
    }
}

populate();

module.exports = populate;