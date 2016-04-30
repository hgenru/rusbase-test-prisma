(function() {
    'use strict';
    var ko = window.ko;
    var modelExtend = window.modelExtend;

    function QuestionViewModel(props) {
        this.title = null;
        this.answers = [];
        this.selected = ko.observable();

        this.picture_hide = 'resources/quiz-pictures/' +
            props.picture_name + '-hide.jpg';
        modelExtend(this, props);
    }

    function AppViewModel() {
        this.currentPage = ko.observable('main');

        this.currentQuestion = ko.observable(0);
        this.questions = ko.observableArray(window.DATA.map(function(q) {
            return new QuestionViewModel(q);
        }));
    }

    window.m_site = new AppViewModel();
    ko.applyBindings(window.m_site);
})();
