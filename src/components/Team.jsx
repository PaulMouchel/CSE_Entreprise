import React from 'react';
import Title from './Title'
import TeamMember from './TeamMember.jsx'

import imageThomas from '../images/thomas.jpg'

const Team = () => {
    const members = [
        {
            image: imageThomas,
            fullName: "Thomas Le-Gal",
            role: "Trésorier",
            holder: true
        },
        {
            image: imageThomas,
            fullName: "Sandrine Lemarié",
            role: "Trésorier",
            holder: true
        },
        {
            image: imageThomas,
            fullName: "Norman Jan-Le-Cloirec",
            role: "Secrétaire",
            holder: false
        },
        {
            image: imageThomas,
            fullName: "Norman Jean-Le-Cloirec",
            role: "Secrétaire",
            holder: false
        },
        {
            image: imageThomas,
            fullName: "Norman Jean-Le-Cloirec",
            role: "Secrétaire",
            holder: false
        }
    ]
    return (
        <>
            <Title>L' équipe du CSE</Title>
            <div className="text-center">
                <h3 className="">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
            <div className="flex flex-col py-6">
                {members.map((member, index) =>
                    <TeamMember key={index} image={member.image} fullName={member.fullName} role={member.role} last={index === members.length - 1} even={index%2 === 0} holder={member.holder}/>
                )}
            </div>
        </>
    );
}

export default Team;