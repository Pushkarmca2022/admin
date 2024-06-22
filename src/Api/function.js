export const get30char=(description) =>{
    if (description) {
        if (description.length > 30) {
            return description.substring(0, 30) + "...";  // Add "..." if description exceeds 30 characters
        } else {
            return description;  // Return full description if it's 30 characters or less
        }
    }
    return '';

}