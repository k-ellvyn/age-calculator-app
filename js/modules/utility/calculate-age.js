const CalculateAge = (birthDate) => {
    let birthDay = Number(birthDate.day);
    let birthMonth = Number(birthDate.month);
    let birthYear = Number(birthDate.year);

    const currentDate = new Date();
    const currentDay = Number(currentDate.getDate());
    const currentMonth = Number(currentDate.getMonth()) + 1;
    const currentYear = Number(currentDate.getFullYear());

    if (birthMonth === 2 && birthDay > 28) {
        birthDay = 28
    }
    else if ((birthMonth === 4 || birthMonth === 6 || birthMonth === 9 || birthMonth == 11) && birthDay > 30) {
        birthDay = 30
    }

    let ageDays = currentDay - birthDay
    let ageMonths = currentMonth - birthMonth
    let ageYears = currentYear - birthYear

    if (ageMonths < 0 || (ageMonths === 0 && currentDay < birthDay)) {
        ageYears--
        ageMonths = 12 + currentMonth - birthMonth
    }

    if (ageDays < 0) {
        ageMonths--
        ageDays = 31 + currentDay - birthDay
    }

    return [ageDays, ageMonths, ageYears]
}

export default CalculateAge