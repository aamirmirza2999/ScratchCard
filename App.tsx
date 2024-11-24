import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScratchCard } from 'rn-scratch-card';

const cardsData = [
  { id: 1, isWinner: false },
  { id: 2, isWinner: true },
  { id: 3, isWinner: false },
];

export default function App() {
  const [scratchedCards, setScratchedCards] = useState<Record<number, boolean>>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleScratch = (cardIndex: number, scratchPercentage: number) => {
    setActiveCard(cardIndex); // Dynamically update the active card during scratching

    if (scratchPercentage > 70 && !scratchedCards[cardIndex]) {
      setScratchedCards({ ...scratchedCards, [cardIndex]: true });
      const isWinner = cardsData[cardIndex].isWinner;

      setTimeout(() => {
        Alert.alert(
          isWinner ? 'Congratulations!' : 'Try Again!',
          isWinner ? 'You have won!' : 'Better luck next time!'
        );
        setActiveCard(null); // Reset active card after result is shown
      }, 300);
    }
  };

  const handleCardSelect = (cardIndex: number) => {
    if (activeCard === null) {
      setActiveCard(cardIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {cardsData.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            disabled={activeCard !== null && activeCard !== index} // Disable if another card is active
            onPress={() => handleCardSelect(index)}
            style={[styles.card, activeCard !== null && activeCard !== index && styles.disabledCard]}
          >
            <View style={styles.scratchCardContainer}>
              <Image
                source={require('./src/scratch_background.png')}
                style={styles.backgroundImage}
              />
              {scratchedCards[index] ? (
                <Text style={styles.resultText}>
                  {card.isWinner ? '🎉 You Win! 🎉' : '❌ You Lose! ❌'}
                </Text>
              ) : activeCard === index ? (
                <ScratchCard
                  source={require('./src/scratch_foreground.png')}
                  brushWidth={50}
                  onScratch={(scratchPercentage) => handleScratch(index, scratchPercentage)}
                  style={styles.scratchCard}
                />
              ) : (
                <Image
                  source={require('./src/scratch_foreground.png')}
                  style={styles.foregroundImage}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  disabledCard: {
    opacity: 0.5, // Add a transparent effect for disabled cards
  },
  scratchCardContainer: {
    width: 100,
    height: 150,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  foregroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  scratchCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
});
