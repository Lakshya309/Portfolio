'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/menu.module.css";

import HeaderLogo from "./HeaderLogo"; 

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const menuContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const menuItemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current page path
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <header className={styles.headerBar}>
        <div className={styles.headerLogoWrapper}>
          <Link href="/">
            <HeaderLogo />
          </Link>
        </div>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <p>{isOpen ? "Close" : "Menu"}</p>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className={styles.menuNav}>
              <motion.ul
                className={styles.menuLinks}
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {menuLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.li
                      key={link.label}
                      className={styles.menuLinkItem}
                      variants={menuItemVariants}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeLinkIndicator"
                          className={styles.activeIndicator}
                        />
                      )}
                      <Link href={link.path} onClick={handleLinkClick}>
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            <div className={styles.socialInfo}>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>

            <div className={styles.contactInfo}>
              <p>Have a project?</p>
              <a href="mailto:lakshya.tekwani0309@gmail.com">Let's talk</a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
