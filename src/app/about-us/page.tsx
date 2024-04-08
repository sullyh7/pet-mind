import React from 'react';
import Image from 'next/image';

const AboutUsPage = () => {
  return (
    <div className="">
      <h2 className="text-5xl text-center font-bold mb-10">Welcome to PetMind, the app where your pets are treated like family!</h2>
      
      
      <div className="flex flex-col md:flex-row items-center justify-center mb-10">
        <section className="flex-1">
          <h2 className="text-3xl text-center font-bold mb-3">Our Mission</h2>
          <p className="text-lg text-center">
            Providing safe, loving pet care whenever you need it—whether for work, vacation, or daily walks
          </p>
        </section>
        
        
        <div className="flex-1 flex justify-center">
          <Image src={"/about-us/friend.svg"} alt="AB" width={300} height={300} />
        </div>
      </div>

      
      <div className="flex flex-col md:flex-row items-center justify-center mb-10">
        
        <div className="flex-1 flex justify-center md:justify-start md:mr-8">
          <Image src={"/about-us/dog.svg"} alt="AB" width={300} height={300} />
        </div>
        
        
        <section className="flex-1">
          <h2 className="text-3xl text-center font-bold mb-3">Our Vision</h2>
          <p className="text-lg text-center">
          PetMind ensures every pet receives care, even when owners can't be there.
          Join our community of pet lovers dedicated to providing the attention they deserve.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage
