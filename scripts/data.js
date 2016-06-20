window.DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(num) {
    var answers = [
        'resources/quiz-pictures/photoshop/' + num + '.jpg',
        'resources/quiz-pictures/prisma/' + num + '.jpg'
    ];
    var isShuffled = Math.random() > 0.5;
    var correctAnswer = 1;
    if (isShuffled) {
        answers = answers.reverse();
        correctAnswer = 0;
    }
    return {
        correct_answer: correctAnswer,
        answers: answers
    };
});
