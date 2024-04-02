import React from 'react';
import Image from 'next/image';
import Dog from '/public/image/ABUS.png';
import Sunset from '/public/image/AB.png';

const AboutUsPage = () => {
  return (
    <div className="">
      <h2 className="text-5xl text-center font-bold mb-10">Welcome to PetMind, the app where your pets are treated like family!</h2>
      
      
      <div className="flex flex-col md:flex-row items-center justify-center mb-10">
        <section className="flex-1">
          <h2 className="text-3xl text-center font-bold mb-3">Our Mission</h2>
          <p className="text-lg text-center">
            Our mission is to provide a safe, loving, and reliable service for pet owners who need to
            find caretakers for their beloved animals. Whether you&apos;re away for work, vacation, or
            just need someone to walk your pet during the day, we&apos;re here to help.
          </p>
        </section>
        
        
        <div className="flex-1 flex justify-center">
          <Image src={Dog} alt="AB" width={300} height={300} />
        </div>
      </div>

      
      <div className="flex flex-col md:flex-row items-center justify-center mb-10">
        
        <div className="flex-1 flex justify-center md:justify-start md:mr-8">
          <Image src={Sunset} alt="AB" width={300} height={300} />
        </div>
        
        
        <section className="flex-1">
          <h2 className="text-3xl text-center md:text-left font-bold mb-3">Our Vision</h2>
          <p className="text-lg text-center md:text-left">
            We envision a world where every pet is cared for, even when their owners can&apos;t be
            there. PetMind aims to create a community of pet lovers supporting each other,
            ensuring that every pet receives the care and attention they deserve.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage
