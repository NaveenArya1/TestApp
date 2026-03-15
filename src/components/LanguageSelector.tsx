import { Button } from '@/components/ui/button';
import { Language } from '@/types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  disabled?: boolean;
}

export function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  disabled = false
}: LanguageSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={selectedLanguage === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        disabled={disabled}
      >
        English
      </Button>
      <Button
        variant={selectedLanguage === 'hi' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('hi')}
        disabled={disabled}
      >
        हिंदी
      </Button>
    </div>
  );
}