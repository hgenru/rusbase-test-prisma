(function() {
    'use strict';
    var ko = window.ko;
    var Ya = window.Ya;
    var modelExtend = window.modelExtend;
    var getRootULR = window.getRootULR;

    function QuestionViewModel(props) {
        this.title = null;
        this.answers = [];
        this.correct_answer = null;
        this.selected = ko.observable(-1);

        this.isSelected = ko.pureComputed(function() {
            return this.selected() > -1;
        }, this);

        this.answerIsCorrect = ko.pureComputed(function() {
            var selected = ko.unwrap(this.selected);
            return selected === this.correct_answer;
        }, this);

        this.picture_hide = 'resources/quiz-pictures/' +
            props.picture_name + '-hide.jpg';
        this.picture_result = 'resources/quiz-pictures/' +
            props.picture_name + '.jpg';
        modelExtend(this, props);
    }

    QuestionViewModel.prototype.selectAnswer = function(answerIndex) {
        this.selected(answerIndex);
    };

    //
    //
    function AppViewModel() {
        this.currentPage = ko.observable('main');

        this.currentQuestion = ko.observable(0);
        this.questions = ko.observableArray(window.DATA.map(function(q) {
            return new QuestionViewModel(q);
        }));

        this.correctAnswersCount = ko.observable(0);
        this.result_picture = ko.observable();
        this.result_text = ko.observable();
    }

    AppViewModel.prototype.init = function() {
        this.share = Ya.share2('yandex-share', {
            theme: {
                services: 'vkontakte,facebook,twitter,' +
                    'odnoklassniki,moimir,whatsapp',
                counter: true,
                lang: 'ru'
            }
        });
    };

    AppViewModel.prototype.getPicture = function(correct, questionsCount) {
        var root = location.protocol + '//' +
            location.host + '/' + window.location.pathname;
        if (correct < (questionsCount / 2)) {
            return root + '/resources/pictures/result-share-4-less.jpg';
        } else {
            return root + '/resources/pictures/result-share-5-more.jpg';
        }
    };

    AppViewModel.prototype.getText = function(correct, questionsCount) {
        return this.getTextForShare(correct, questionsCount);
    };

    AppViewModel.prototype.getTextForShare = function(correct, questionsCount) {
        var titles = [
            'Даже случайно не попали? Да быть не может!',
            'Вам, наверное, все равно — Призма, Фотошоп или вообще Пэйнт.',
            'Но ведь… ведь Prisma старалась…',
            'Не рассказывайте об этом создателям Prisma.',
            'Фотошоп вас вдохновляет больше.',
            'Prisma вас вдохновляет больше, чем фотошоп.',
            'Вас не проведешь. Ну почти.',
            'Давайте скажем Prisma «спасибо» за классное приложение!',
            'Признавайтесь, в чем вы так хорошо разбираетесь: в искусстве или в нейронных сетях?',
            'Да вы просто мастер по нейронным сетям! Попробуйте выпустить собственное приложение :)'
        ];
        return titles[correct];
    };

    AppViewModel.prototype.finish = function() {
        var questions = ko.unwrap(this.questions);
        var correctAnswersCount = questions.reduce(function(prev, question) {
            var value = question.answerIsCorrect() ? 1 : 0;
            return prev + value;
        }, 0);
        var resultPicture = this.getPicture(
            correctAnswersCount, questions.length);
        this.result_picture(resultPicture);
        this.result_text(this.getText(
            correctAnswersCount, questions.length));

        var shareText = this.getTextForShare(
            correctAnswersCount, questions.length);

        this.correctAnswersCount(correctAnswersCount);
        this.currentPage('result');
        this.share.updateContent({
            title: 'Призма или фотошоп? ' +
                correctAnswersCount + ' из ' + questions.length,
            description: shareText,
            image: resultPicture
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        window.m_site = new AppViewModel();
        window.m_site.init();
        ko.applyBindings(window.m_site);
    });
})();
