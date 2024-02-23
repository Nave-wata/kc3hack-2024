type CoordinateProps = {
    x: number;
    y: number;
    eventflag: boolean;
}

export const Coordinate: () => CoordinateProps[] = () => {
    return [
    /*大阪*/
    {x:765, y:560, eventflag: false}, 
    {x:765, y:655, eventflag: false},
    {x:695, y:710, eventflag: false},
    /*和歌山*/
    {x:705, y:810, eventflag: false},
    {x:675, y:940, eventflag: false},
    {x:755, y:1065, eventflag: true},
    {x:835, y:1075, eventflag: false},
    {x:935, y:1025, eventflag: true},
    /*奈良*/
    {x:855, y:870, eventflag: false}, 
    {x:905, y:760, eventflag: false},
    {x:905, y:670, eventflag: true},
    {x:895, y:570, eventflag: true}, 
    {x:1005, y:650, eventflag: false}, 
    /*三重*/
    {x:1055, y:740, eventflag: false}, 
    {x:1125, y:690, eventflag: false}, 
    {x:1245, y:685, eventflag: true},
    {x:1115, y:580, eventflag: false}, 
    {x:1145, y:430, eventflag: false},
    {x:1215, y:350, eventflag: true}, 
    {x:1145, y:310, eventflag: false},
    /*滋賀*/
    {x:1015, y:405, eventflag: false},
    {x:1055, y:300, eventflag: true},
    {x:1065, y:200, eventflag: false},
    {x:955, y:230, eventflag: true}, 
    {x:915, y:290, eventflag: false},
    /*京都*/
    {x:865, y:385, eventflag: true},
    {x:795, y:300, eventflag: false}, 
    {x:735, y:240, eventflag: false},
    {x:655, y:215, eventflag: false},
    {x:605, y:140, eventflag: true},
    /*兵庫*/
    {x:505, y:160, eventflag: false}, 
    {x:425, y:220, eventflag: false}, 
    {x:405, y:280, eventflag: false},
    {x:395, y:360, eventflag: false},
    {x:455, y:465, eventflag: true},
    {x:525, y:475, eventflag: false},
    {x:485, y:740, eventflag: false}, 
    {x:530, y:660, eventflag: false},
    {x:595, y:495, eventflag: true},
    {x:585, y:380, eventflag: false},
    /*大阪*/
    {x:725, y:420, eventflag: false},
    {x:775, y:490, eventflag: true},
    {x:805, y:580, eventflag: false}, 
    ];
}