-- Chinook Music Database Schema and Seed Data
-- Covers course goals: 1, 2, 5, 9, 10, 12

-- Artists table
CREATE TABLE artists (
    ArtistId INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);

-- Albums table
CREATE TABLE albums (
    AlbumId INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    ArtistId INTEGER NOT NULL,
    FOREIGN KEY (ArtistId) REFERENCES artists(ArtistId)
);

-- Genres table
CREATE TABLE genres (
    GenreId INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);

-- Media types table
CREATE TABLE media_types (
    MediaTypeId INTEGER PRIMARY KEY,
    Name TEXT
);

-- Tracks table
CREATE TABLE tracks (
    TrackId INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    AlbumId INTEGER,
    MediaTypeId INTEGER NOT NULL,
    GenreId INTEGER,
    Composer TEXT,
    Milliseconds INTEGER NOT NULL,
    Bytes INTEGER,
    UnitPrice REAL NOT NULL,
    FOREIGN KEY (AlbumId) REFERENCES albums(AlbumId),
    FOREIGN KEY (GenreId) REFERENCES genres(GenreId),
    FOREIGN KEY (MediaTypeId) REFERENCES media_types(MediaTypeId)
);

-- Playlists table
CREATE TABLE playlists (
    PlaylistId INTEGER PRIMARY KEY,
    Name TEXT
);

-- Playlist tracks (many-to-many)
CREATE TABLE playlist_track (
    PlaylistId INTEGER NOT NULL,
    TrackId INTEGER NOT NULL,
    PRIMARY KEY (PlaylistId, TrackId),
    FOREIGN KEY (PlaylistId) REFERENCES playlists(PlaylistId),
    FOREIGN KEY (TrackId) REFERENCES tracks(TrackId)
);

-- Employees table
CREATE TABLE employees (
    EmployeeId INTEGER PRIMARY KEY,
    LastName TEXT NOT NULL,
    FirstName TEXT NOT NULL,
    Title TEXT,
    ReportsTo INTEGER,
    BirthDate TEXT,
    HireDate TEXT,
    Address TEXT,
    City TEXT,
    State TEXT,
    Country TEXT,
    PostalCode TEXT,
    Phone TEXT,
    Email TEXT,
    FOREIGN KEY (ReportsTo) REFERENCES employees(EmployeeId)
);

-- Customers table
CREATE TABLE customers (
    CustomerId INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Company TEXT,
    Address TEXT,
    City TEXT,
    State TEXT,
    Country TEXT,
    PostalCode TEXT,
    Phone TEXT,
    Email TEXT NOT NULL
);

-- Invoices table
CREATE TABLE invoices (
    InvoiceId INTEGER PRIMARY KEY,
    CustomerId INTEGER NOT NULL,
    InvoiceDate TEXT NOT NULL,
    BillingAddress TEXT,
    BillingCity TEXT,
    BillingState TEXT,
    BillingCountry TEXT,
    BillingPostalCode TEXT,
    Total REAL NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES customers(CustomerId)
);

-- Invoice lines table
CREATE TABLE invoice_items (
    InvoiceLineId INTEGER PRIMARY KEY,
    InvoiceId INTEGER NOT NULL,
    TrackId INTEGER NOT NULL,
    UnitPrice REAL NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (InvoiceId) REFERENCES invoices(InvoiceId),
    FOREIGN KEY (TrackId) REFERENCES tracks(TrackId)
);

-- Insert genres
INSERT INTO genres (Name) VALUES
    ('Rock'),
    ('Jazz'),
    ('Metal'),
    ('Alternative'),
    ('Classical'),
    ('Blues'),
    ('Electronic'),
    ('Pop'),
    ('Hip Hop'),
    ('R&B'),
    ('Country'),
    ('Folk'),
    ('Reggae'),
    ('Soundtrack'),
    ('World');

-- Insert media types
INSERT INTO media_types (Name) VALUES
    ('MPEG audio file'),
    ('Protected AAC audio file'),
    ('AAC audio file'),
    ('Purchased AAC audio file'),
    ('FLAC audio file');

-- Insert artists
INSERT INTO artists (Name) VALUES
    ('AC/DC'),
    ('Accept'),
    ('Aerosmith'),
    ('Led Zeppelin'),
    ('Metallica'),
    ('Nirvana'),
    ('Pearl Jam'),
    ('Pink Floyd'),
    ('Queen'),
    ('The Beatles'),
    ('U2'),
    ('Black Sabbath'),
    ('Deep Purple'),
    ('Iron Maiden'),
    ('Guns N'' Roses'),
    ('The Rolling Stones'),
    ('The Who'),
    ('Van Halen'),
    ('Miles Davis'),
    ('John Coltrane'),
    ('Duke Ellington'),
    ('Charlie Parker'),
    ('Billie Holiday'),
    ('Louis Armstrong'),
    ('Daft Punk'),
    ('Kraftwerk'),
    ('Depeche Mode'),
    ('New Order'),
    ('Radiohead'),
    ('Coldplay'),
    ('Green Day'),
    ('Foo Fighters'),
    ('Red Hot Chili Peppers'),
    ('Sublime'),
    ('Bob Marley');

-- Insert albums
INSERT INTO albums (Title, ArtistId) VALUES
    ('Back in Black', 1),
    ('Highway to Hell', 1),
    ('Balls to the Wall', 2),
    ('Get Your Wings', 3),
    ('Led Zeppelin IV', 4),
    ('Physical Graffiti', 4),
    ('Master of Puppets', 5),
    ('Ride the Lightning', 5),
    ('Nevermind', 6),
    ('In Utero', 6),
    ('Ten', 7),
    ('Vs.', 7),
    ('The Dark Side of the Moon', 8),
    ('Wish You Were Here', 8),
    ('A Night at the Opera', 9),
    ('News of the World', 9),
    ('Abbey Road', 10),
    ('Sgt. Peppers', 10),
    ('The Joshua Tree', 11),
    ('Achtung Baby', 11),
    ('Paranoid', 12),
    ('Master of Reality', 12),
    ('Machine Head', 13),
    ('Deep Purple in Rock', 13),
    ('The Number of the Beast', 14),
    ('Powerslave', 14),
    ('Appetite for Destruction', 15),
    ('Use Your Illusion I', 15),
    ('Sticky Fingers', 16),
    ('Exile on Main St.', 16),
    ('Whos Next', 17),
    ('Tommy', 17),
    ('1984', 18),
    ('Van Halen', 18),
    ('Kind of Blue', 19),
    ('Bitches Brew', 19),
    ('A Love Supreme', 20),
    ('Blue Train', 20),
    ('Discovery', 25),
    ('Random Access Memories', 25),
    ('OK Computer', 29),
    ('Kid A', 29),
    ('Parachutes', 30),
    ('A Rush of Blood to the Head', 30),
    ('Dookie', 31),
    ('American Idiot', 31),
    ('The Colour and the Shape', 32),
    ('There Is Nothing Left to Lose', 32),
    ('Blood Sugar Sex Magik', 33),
    ('Californication', 33),
    ('40oz. to Freedom', 34),
    ('Legend', 35),
    ('Exodus', 35),
    ('For Those About to Rock', 1),
    ('Flick of the Switch', 1),
    ('Fly on the Wall', 1),
    ('Blow Up Your Video', 1),
    ('The Razors Edge', 1),
    ('Led Zeppelin I', 4),
    ('Led Zeppelin II', 4),
    ('Led Zeppelin III', 4),
    ('Houses of the Holy', 4),
    ('Presence', 4),
    ('Kill Em All', 5),
    ('And Justice for All', 5),
    ('The Black Album', 5),
    ('Load', 5),
    ('The Wall', 8),
    ('Animals', 8),
    ('The Division Bell', 8),
    ('Meddle', 8),
    ('Revolver', 10),
    ('White Album', 10),
    ('Rubber Soul', 10),
    ('Help!', 10),
    ('Let It Be', 10);

-- Insert tracks (sampling across genres and albums)
INSERT INTO tracks (Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes, UnitPrice) VALUES
    ('Back In Black', 1, 1, 1, 'Angus Young, Malcolm Young, Brian Johnson', 255227, 5510424, 0.99),
    ('Hells Bells', 1, 1, 1, 'Angus Young, Malcolm Young, Brian Johnson', 312292, 6742728, 0.99),
    ('Shoot to Thrill', 1, 1, 1, 'Angus Young, Malcolm Young, Brian Johnson', 317056, 6852860, 0.99),
    ('Highway to Hell', 2, 1, 1, 'Angus Young, Malcolm Young, Bon Scott', 208400, 4507296, 0.99),
    ('Stairway to Heaven', 5, 1, 1, 'Jimmy Page, Robert Plant', 482830, 10413904, 0.99),
    ('Black Dog', 5, 1, 1, 'Jimmy Page, Robert Plant, John Paul Jones', 296672, 6412672, 0.99),
    ('Rock and Roll', 5, 1, 1, 'Jimmy Page, Robert Plant, John Paul Jones, John Bonham', 220917, 4775708, 0.99),
    ('Master of Puppets', 7, 1, 3, 'James Hetfield, Lars Ulrich, Kirk Hammett, Cliff Burton', 515539, 11114828, 0.99),
    ('Battery', 7, 1, 3, 'James Hetfield, Lars Ulrich', 312325, 6745416, 0.99),
    ('Welcome Home (Sanitarium)', 7, 1, 3, 'James Hetfield, Lars Ulrich, Kirk Hammett', 387186, 8358160, 0.99),
    ('Smells Like Teen Spirit', 9, 1, 4, 'Kurt Cobain', 301296, 6507968, 0.99),
    ('Come as You Are', 9, 1, 4, 'Kurt Cobain', 219219, 4736820, 0.99),
    ('Lithium', 9, 1, 4, 'Kurt Cobain', 256928, 5551476, 0.99),
    ('Alive', 11, 1, 1, 'Eddie Vedder, Stone Gossard', 341482, 7376368, 0.99),
    ('Even Flow', 11, 1, 1, 'Eddie Vedder, Stone Gossard', 293720, 6346372, 0.99),
    ('Jeremy', 11, 1, 1, 'Eddie Vedder, Jeff Ament', 318981, 6890500, 0.99),
    ('Money', 13, 1, 1, 'Roger Waters', 382830, 8269064, 0.99),
    ('Time', 13, 1, 1, 'David Gilmour, Roger Waters, Richard Wright, Nick Mason', 413947, 8943892, 0.99),
    ('Brain Damage', 13, 1, 1, 'Roger Waters', 228000, 4925840, 0.99),
    ('Bohemian Rhapsody', 15, 1, 1, 'Freddie Mercury', 354947, 7667260, 0.99),
    ('Killer Queen', 15, 1, 1, 'Freddie Mercury', 182000, 3933240, 0.99),
    ('We Will Rock You', 16, 1, 1, 'Brian May', 122000, 2636636, 0.99),
    ('We Are the Champions', 16, 1, 1, 'Freddie Mercury', 182000, 3933240, 0.99),
    ('Come Together', 17, 1, 1, 'John Lennon, Paul McCartney', 260000, 5619432, 0.99),
    ('Here Comes the Sun', 17, 1, 1, 'George Harrison', 185000, 3997480, 0.99),
    ('With or Without You', 19, 1, 1, 'U2', 285200, 6162796, 0.99),
    ('Where the Streets Have No Name', 19, 1, 1, 'U2', 337893, 7300044, 0.99),
    ('One', 20, 1, 1, 'U2', 276000, 5963380, 0.99),
    ('Iron Man', 21, 1, 3, 'Tony Iommi, Ozzy Osbourne, Geezer Butler, Bill Ward', 358093, 7737520, 0.99),
    ('Paranoid', 21, 1, 3, 'Tony Iommi, Ozzy Osbourne, Geezer Butler, Bill Ward', 170893, 3693004, 0.99),
    ('Smoke on the Water', 23, 1, 1, 'Ritchie Blackmore, Ian Gillan, Roger Glover, Jon Lord, Ian Paice', 339893, 7342516, 0.99),
    ('Highway Star', 23, 1, 1, 'Ritchie Blackmore, Ian Gillan, Roger Glover, Jon Lord, Ian Paice', 368093, 7951920, 0.99),
    ('The Trooper', 25, 1, 3, 'Steve Harris', 249893, 5398160, 0.99),
    ('Run to the Hills', 25, 1, 3, 'Steve Harris', 230893, 4989320, 0.99),
    ('Welcome to the Jungle', 27, 1, 1, 'Guns N'' Roses', 273893, 5916936, 0.99),
    ('Sweet Child O'' Mine', 27, 1, 1, 'Guns N'' Roses', 356893, 7709264, 0.99),
    ('Paradise City', 27, 1, 1, 'Guns N'' Roses', 406893, 8791340, 0.99),
    ('Satisfaction', 29, 1, 1, 'Mick Jagger, Keith Richards', 224893, 4859744, 0.99),
    ('Paint It Black', 29, 1, 1, 'Mick Jagger, Keith Richards', 225893, 4881356, 0.99),
    ('Baba O''Riley', 31, 1, 1, 'Pete Townshend', 300893, 6501460, 0.99),
    ('Behind Blue Eyes', 31, 1, 1, 'Pete Townshend', 220893, 4773204, 0.99),
    ('Jump', 33, 1, 1, 'Eddie Van Halen, Alex Van Halen, Michael Anthony, David Lee Roth', 240893, 5205600, 0.99),
    ('Panama', 33, 1, 1, 'Eddie Van Halen, Alex Van Halen, Michael Anthony, David Lee Roth', 211893, 4578592, 0.99),
    ('So What', 35, 1, 2, 'Miles Davis', 564893, 12205132, 0.99),
    ('Blue in Green', 35, 1, 2, 'Miles Davis, Bill Evans', 327893, 7084676, 0.99),
    ('All Blues', 35, 1, 2, 'Miles Davis', 693893, 14993460, 0.99),
    ('A Love Supreme, Pt. 1', 37, 1, 2, 'John Coltrane', 463893, 10023056, 0.99),
    ('Around the World', 39, 1, 7, 'Thomas Bangalter, Guy-Manuel de Homem-Christo', 429893, 9287704, 0.99),
    ('One More Time', 39, 1, 7, 'Thomas Bangalter, Guy-Manuel de Homem-Christo', 320893, 6933648, 0.99),
    ('Get Lucky', 40, 1, 7, 'Thomas Bangalter, Guy-Manuel de Homem-Christo, Nile Rodgers, Pharrell Williams', 369893, 7992168, 0.99),
    ('Paranoid Android', 41, 1, 4, 'Radiohead', 382893, 8272204, 0.99),
    ('Karma Police', 41, 1, 4, 'Radiohead', 263893, 5702344, 0.99),
    ('Yellow', 43, 1, 4, 'Coldplay', 269893, 5832084, 0.99),
    ('Clocks', 44, 1, 4, 'Coldplay', 307893, 6652416, 0.99),
    ('Basket Case', 45, 1, 4, 'Billie Joe Armstrong', 189893, 4103592, 0.99),
    ('Boulevard of Broken Dreams', 46, 1, 4, 'Green Day', 262893, 5680368, 0.99),
    ('Everlong', 47, 1, 4, 'Dave Grohl', 250893, 5421688, 0.99),
    ('Under the Bridge', 49, 1, 4, 'Red Hot Chili Peppers', 264893, 5724256, 0.99),
    ('Californication', 50, 1, 4, 'Red Hot Chili Peppers', 321893, 6954984, 0.99),
    ('What I Got', 51, 1, 1, 'Brad Nowell', 168893, 3649608, 0.99),
    ('Santeria', 51, 1, 1, 'Brad Nowell', 222893, 4816452, 0.99),
    ('No Woman No Cry', 52, 1, 13, 'Bob Marley', 285893, 6177680, 0.99),
    ('Redemption Song', 52, 1, 13, 'Bob Marley', 227893, 4924444, 0.99),
    ('Three Little Birds', 52, 1, 13, 'Bob Marley', 180893, 3908520, 0.99),
    ('One Love', 53, 1, 13, 'Bob Marley', 231893, 5010588, 0.99);

-- Insert playlists
INSERT INTO playlists (Name) VALUES
    ('Rock Classics'),
    ('Metal Mayhem'),
    ('Jazz Essentials'),
    ('Electronic Beats'),
    ('Alternative Mix'),
    ('Reggae Vibes'),
    ('Workout Hits'),
    ('Road Trip'),
    ('90s Nostalgia'),
    ('Top Rated');

-- Insert playlist tracks
INSERT INTO playlist_track (PlaylistId, TrackId) VALUES
    (1, 1), (1, 5), (1, 6), (1, 14), (1, 17), (1, 20), (1, 24), (1, 31),
    (2, 8), (2, 9), (2, 10), (2, 29), (2, 30), (2, 33), (2, 34),
    (3, 44), (3, 45), (3, 46), (3, 47),
    (4, 48), (4, 49), (4, 50),
    (5, 11), (5, 12), (5, 13), (5, 51), (5, 52), (5, 53), (5, 54), (5, 57),
    (6, 62), (6, 63), (6, 64), (6, 65),
    (7, 1), (7, 8), (7, 14), (7, 35), (7, 42),
    (8, 4), (8, 35), (8, 36), (8, 37), (8, 38), (8, 40),
    (9, 11), (9, 12), (9, 13), (9, 55), (9, 56), (9, 57), (9, 60), (9, 61),
    (10, 5), (10, 8), (10, 11), (10, 17), (10, 20), (10, 36), (10, 44), (10, 50);

-- Insert employees
INSERT INTO employees (LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, Country, Phone, Email) VALUES
    ('Adams', 'Andrew', 'General Manager', NULL, '1962-02-18', '2002-08-14', 'Kungsgatan 22', 'Stockholm', 'Sweden', '+46-70-111-2222', 'andrew@musicstore.se'),
    ('Edwards', 'Nancy', 'Sales Manager', 1, '1958-12-08', '2002-05-01', 'Drottninggatan 45', 'Stockholm', 'Sweden', '+46-70-222-3333', 'nancy@musicstore.se'),
    ('Peacock', 'Jane', 'Sales Support', 2, '1973-08-29', '2002-04-01', 'Sveavägen 88', 'Stockholm', 'Sweden', '+46-70-333-4444', 'jane@musicstore.se'),
    ('Park', 'Margaret', 'Sales Support', 2, '1947-09-19', '2003-05-03', 'Vasagatan 12', 'Göteborg', 'Sweden', '+46-70-444-5555', 'margaret@musicstore.se'),
    ('Johnson', 'Steve', 'Sales Support', 2, '1965-03-03', '2003-10-17', 'Östra Hamngatan 8', 'Göteborg', 'Sweden', '+46-70-555-6666', 'steve@musicstore.se');

-- Insert customers
INSERT INTO customers (FirstName, LastName, Company, Address, City, Country, PostalCode, Phone, Email) VALUES
    ('Luís', 'Gonçalves', 'Embraer', 'Rua das Flores 34', 'São Paulo', 'Brazil', '01310-100', '+55-11-3055-3278', 'luis@embraer.com.br'),
    ('Leonie', 'Köhler', NULL, 'Theodor-Heuss-Str. 34', 'Stuttgart', 'Germany', '70174', '+49-711-2842222', 'leonie@surfeu.de'),
    ('François', 'Tremblay', NULL, 'Rue Saint-Honoré 12', 'Montréal', 'Canada', 'H3B 1B4', '+1-514-721-4711', 'ftremblay@gmail.com'),
    ('Bjørn', 'Hansen', NULL, 'Storgatan 15', 'Oslo', 'Norway', '0171', '+47-22-44-22-22', 'bjorn.hansen@yahoo.no'),
    ('František', 'Wichterlová', 'JetBrains s.r.o.', 'Klanova 9/506', 'Prague', 'Czech Republic', '14700', '+420-2-4172-5555', 'fwichterlova@jetbrains.com'),
    ('Helena', 'Holý', NULL, 'Rilská 3174/6', 'Prague', 'Czech Republic', '14300', '+420-2-4177-0449', 'hholy@gmail.com'),
    ('Astrid', 'Gruber', NULL, 'Rotenturmstraße 4', 'Vienna', 'Austria', '1010', '+43-1-5171-9267', 'astrid.gruber@apple.at'),
    ('Daan', 'Peeters', NULL, 'Grétrystraat 63', 'Brussels', 'Belgium', '1000', '+32-2-219-0300', 'daan.peeters@apple.be'),
    ('Kara', 'Nielsen', NULL, 'Sønder Boulevard 51', 'Copenhagen', 'Denmark', '1720', '+45-33-32-11-33', 'kara.nielsen@jubii.dk'),
    ('Eduardo', 'Martins', 'Woodstock Discos', 'Rua Dr. Falcão Filho 155', 'São Paulo', 'Brazil', '01007-010', '+55-11-3033-5446', 'eduardo@woodstock.com.br');

-- Insert invoices
INSERT INTO invoices (CustomerId, InvoiceDate, BillingAddress, BillingCity, BillingCountry, BillingPostalCode, Total) VALUES
    (1, '2024-01-02', 'Rua das Flores 34', 'São Paulo', 'Brazil', '01310-100', 9.91),
    (2, '2024-01-05', 'Theodor-Heuss-Str. 34', 'Stuttgart', 'Germany', '70174', 5.94),
    (3, '2024-01-10', 'Rue Saint-Honoré 12', 'Montréal', 'Canada', 'H3B 1B4', 3.96),
    (4, '2024-01-15', 'Storgatan 15', 'Oslo', 'Norway', '0171', 8.91),
    (5, '2024-01-20', 'Klanova 9/506', 'Prague', 'Czech Republic', '14700', 11.88),
    (1, '2024-02-01', 'Rua das Flores 34', 'São Paulo', 'Brazil', '01310-100', 7.92),
    (6, '2024-02-10', 'Rilská 3174/6', 'Prague', 'Czech Republic', '14300', 5.94),
    (7, '2024-02-15', 'Rotenturmstraße 4', 'Vienna', 'Austria', '1010', 9.91),
    (8, '2024-02-20', 'Grétrystraat 63', 'Brussels', 'Belgium', '1000', 4.95),
    (9, '2024-02-25', 'Sønder Boulevard 51', 'Copenhagen', 'Denmark', '1720', 6.93);

-- Insert invoice items
INSERT INTO invoice_items (InvoiceId, TrackId, UnitPrice, Quantity) VALUES
    (1, 1, 0.99, 2), (1, 5, 0.99, 3), (1, 11, 0.99, 5),
    (2, 8, 0.99, 2), (2, 20, 0.99, 4),
    (3, 24, 0.99, 2), (3, 31, 0.99, 2),
    (4, 35, 0.99, 3), (4, 44, 0.99, 6),
    (5, 48, 0.99, 4), (5, 51, 0.99, 8),
    (6, 14, 0.99, 2), (6, 17, 0.99, 3), (6, 26, 0.99, 3),
    (7, 29, 0.99, 2), (7, 33, 0.99, 4),
    (8, 36, 0.99, 5), (8, 40, 0.99, 5),
    (9, 42, 0.99, 3), (9, 46, 0.99, 2),
    (10, 55, 0.99, 4), (10, 62, 0.99, 3);

-- Create indexes
CREATE INDEX idx_tracks_album ON tracks(AlbumId);
CREATE INDEX idx_tracks_genre ON tracks(GenreId);
CREATE INDEX idx_albums_artist ON albums(ArtistId);
CREATE INDEX idx_invoices_customer ON invoices(CustomerId);
