MERGE INTO categories (id, name) KEY(id) VALUES (1, 'Analgesicos');
MERGE INTO categories (id, name) KEY(id) VALUES (2, 'Dermocosmetica');
MERGE INTO categories (id, name) KEY(id) VALUES (3, 'Suplementos');
MERGE INTO categories (id, name) KEY(id) VALUES (4, 'Higiene');
MERGE INTO categories (id, name) KEY(id) VALUES (5, 'Infantil');
MERGE INTO categories (id, name) KEY(id) VALUES (6, 'Primeros auxilios');

MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (1, 'Paracetamol 500 mg', 'Laboratorio SaludPlus', 1);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (2, 'Crema solar SPF 50', 'Dermalife', 2);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (3, 'Vitaminas C + Zinc', 'VitalCare', 3);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (4, 'Gel hidroalcoholico 500 ml', 'CleanCare', 4);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (5, 'Cepillo dental suave', 'OralPlus', 4);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (6, 'Panales talla 3', 'BabyLife', 5);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (7, 'Suero fisiologico monodosis', 'SaludBaby', 5);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (8, 'Gasas esteriles 25 unidades', 'MediPlus', 6);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (9, 'Tiritas surtidas', 'CuraFast', 6);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (10, 'Ibuprofeno 400 mg', 'Laboratorio SaludPlus', 1);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (11, 'Protector labial SPF 30', 'Dermalife', 2);
MERGE INTO products (id, name, manufacturer, category_id) KEY(id) VALUES (12, 'Magnesio comprimidos', 'VitalCare', 3);

ALTER TABLE categories ALTER COLUMN id RESTART WITH 7;
ALTER TABLE products ALTER COLUMN id RESTART WITH 13;
