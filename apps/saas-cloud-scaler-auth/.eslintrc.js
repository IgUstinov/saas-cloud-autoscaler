module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['dist', 'node_modules', 'docker', 'migrations', 'tests'],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        // Требует использование const, если переменная никогда не переназначается
        'prefer-const': 'error',
        /*
        Запретить определение переменной через var,
        Пока warn, так как нужно исправить во многих местах.
        */
        'no-var': 'warn',
        'no-console': 'warn',
        /*
        Запретить использоваение объекта arguments.
        Синтакис устарел, актуально использовать оператор rest.
        Пока warn, так как нужно исправить во многих местах.
        */
        'prefer-rest-params': 'warn',
        /*
        Запретить псевдонимы для this: const self = this.
        Пока warn, так как надо исправить во многих местах.
        */
        '@typescript-eslint/no-this-alias': 'warn',

        /*
        Пока warn, так как надо исправить во многих местах.
        */
        '@typescript-eslint/no-explicit-any': 'warn',
        /*
        Запретить импорт с помощью require.
        Пока warn, так как надо исправить во многих местах.
        */
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/interface-name-prefix': 'off',
        // Указать возвращаемые типы для функций и методов класса
        '@typescript-eslint/explicit-function-return-type': 'off',
        // Указать типы для экспортируемых функций и публичных методов класса
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'unused-imports/no-unused-imports': 'error',
        /*
        Отключает стандартные правила, чтобы исключить конфликты
        в соответствии с документацией
        */
        'no-unused-vars': 'off',
        /*
        https://eslint.org/docs/latest/rules/no-unused-vars
        Пока warn, так как надо исправить во многих местах.
        */
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        // Сортирует импорты
        'sort-imports': [
          'error',
          {
            ignoreDeclarationSort: true,
          },
        ],
        // Добавление отступов в классах
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        // Добавление отсутпов между различными директивами (не относится к методами класса)
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: 'function', next: 'function' },
          { blankLine: 'always', prev: 'class', next: 'class' },
        ],
        /*
        Обязует использовать фигурные скобки в блоках (if, else и т.д.),
        даже если они содержат только одну инструкцию
        */
        curly: ['error', 'all'],
        // Копия конфига prettier
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            useTabs: false,
            trailingComma: 'all',
            semi: true,
            bracketSpacing: true,
            printWidth: 100,
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
};
