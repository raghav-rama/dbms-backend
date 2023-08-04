-- Database Schema for a Shopping Website

CREATE TABLE seller (
    seller_id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(10) NOT NULL,
    last_name varchar(10) NOT NULL,
    seller_user_name varchar(10) NOT NULL UNIQUE,
    phone BIGINT NOT NULL,
    email varchar(20) NOT NULL,
    PRIMARY KEY (seller_id)
);

CREATE TABLE buyer (
    buyer_id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(10) NOT NULL,
    last_name varchar(10) NOT NULL,
    buyer_user_name varchar(10) NOT NULL UNIQUE,
    phone BIGINT NOT NULL,
    email varchar(20) NOT NULL,
    PRIMARY KEY (buyer_id)
);

CREATE TABLE admin (
    admin_id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(10) NOT NULL,
    last_name varchar(10) NOT NULL,
    admin_user_name varchar(10) NOT NULL UNIQUE,
    PRIMARY KEY (admin_id)
);

CREATE TABLE product (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name varchar(10) NOT NULL,
    product_price INT NOT NULL,
    product_description varchar(100),
    PRIMARY KEY (product_id)
);

CREATE TABLE seller_login_data (
    seller_user_name varchar(10) NOT NULL,
    seller_password varchar(10) NOT NULL
);

ALTER TABLE seller_login_data ADD CONSTRAINT fk_seller_login_data_seller_id FOREIGN KEY (seller_user_name) REFERENCES seller(seller_user_name) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE buyer_login_data (
    buyer_user_name varchar(10) NOT NULL,
    buyer_password varchar(10) NOT NULL
);

ALTER TABLE buyer_login_data ADD CONSTRAINT fk_buyer_login_data_buyer_id FOREIGN KEY (buyer_user_name) REFERENCES buyer(buyer_user_name) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE admin_login_data (
    admin_user_name varchar(10) NOT NULL,
    admin_password varchar(10) NOT NULL
);

ALTER TABLE admin_login_data ADD CONSTRAINT fk_admin_login_data_admin_id FOREIGN KEY (admin_user_name) REFERENCES admin(admin_user_name) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE seller_product (
    seller_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (product_id, seller_id)
);

ALTER TABLE seller_product
ADD CONSTRAINT fk_seller_product_seller_id FOREIGN KEY (seller_id) REFERENCES seller(seller_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_seller_product_product_id FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    buyer_id INT NOT NULL,
    order_date DATE NOT NULL,
    order_status varchar(10) NOT NULL,
    PRIMARY KEY (order_id)
);

ALTER TABLE orders ADD CONSTRAINT fk_orders_buyer_id FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE order_items (
    order_item_id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    seller_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_item_id)
);

ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_order_items_seller_product FOREIGN KEY (seller_id, product_id) REFERENCES seller_product(seller_id, product_id) ON DELETE CASCADE ON UPDATE CASCADE;
